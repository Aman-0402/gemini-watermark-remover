import { useCallback, useEffect, useRef, useState } from 'react';
import { cleanFrame, resolveBox, getRoi, applyMaskToRegion, removeWatermarkUniform } from '../lib/watermarkEngine';
import { smoothScrollTo, handleExportAd } from '../lib/mediaUtils';

// Shared dropzone/tuner/export state machine used by both the image and
// video watermark removers. The two tools differ only in how they create
// their engine, grab a preview frame, detect the watermark, and export —
// everything else (sliders, live tuner canvases, drag & drop) is identical.
export function useMediaRemover({
  accept,
  createEngine,
  getBase,
  getBgImg,
  detectFn,
  fallbackPreset,
  grabFrame,
  doExport,
}) {
  const engineRef = useRef(null);
  const tunerRef = useRef(null);
  const statusRef = useRef(null);
  const resultsRef = useRef(null);
  const mainCanvasRef = useRef(null);
  const zoomCanvasRef = useRef(null);
  const zoomCleanedCanvasRef = useRef(null);
  const originalBitmapRef = useRef(null);
  const previewFrameRef = useRef(null);
  const baseRef = useRef(null);
  const fileRef = useRef(null);

  const [isProcessing, setIsProcessing] = useState(false);
  const [isDragOver, setIsDragOver] = useState(false);
  const [showTuner, setShowTuner] = useState(false);
  const [detected, setDetected] = useState(null);
  const [settings, setSettings] = useState({ gain: 0.6, offsetX: 0, offsetY: 0, sizeScale: 1, maskMode: 'unblend' });
  const [sliderRange, setSliderRange] = useState({ offsetXMin: -250, offsetXMax: 150, offsetYMin: -250, offsetYMax: 150 });
  const [isExporting, setIsExporting] = useState(false);
  const [progress, setProgress] = useState(0);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const renderTuner = useCallback((currentSettings) => {
    const frame = previewFrameRef.current;
    const engine = engineRef.current;
    const base = baseRef.current;
    const mainCanvas = mainCanvasRef.current;
    if (!frame || !mainCanvas || !engine || !base) return;
    const { width, height, imageData } = frame;

    const offscreen = document.createElement('canvas');
    offscreen.width = width;
    offscreen.height = height;
    const octx = offscreen.getContext('2d');

    const mode = currentSettings.maskMode || 'unblend';
    let wm, roi;

    if (mode === 'strong') {
      wm = resolveBox(base, width, height, currentSettings);
      roi = getRoi(width, height, wm);
      const copy = new ImageData(new Uint8ClampedArray(imageData.data), width, height);
      removeWatermarkUniform(copy, wm, currentSettings.gain);
      octx.putImageData(copy, 0, 0);
    } else if (mode !== 'unblend') {
      wm = resolveBox(base, width, height, currentSettings);
      roi = getRoi(width, height, wm);
      octx.putImageData(imageData, 0, 0);
      applyMaskToRegion(octx, wm, mode);
    } else {
      const copy = new ImageData(new Uint8ClampedArray(imageData.data), width, height);
      const bgImg = getBgImg(engine);
      ({ wm, roi } = cleanFrame(bgImg, copy, width, height, base, currentSettings));
      octx.putImageData(copy, 0, 0);
    }

    const maxW = 360;
    const scale = Math.min(1, maxW / width);
    mainCanvas.width = Math.round(width * scale);
    mainCanvas.height = Math.round(height * scale);
    const mctx = mainCanvas.getContext('2d');
    mctx.drawImage(offscreen, 0, 0, mainCanvas.width, mainCanvas.height);
    mctx.strokeStyle = '#6366f1';
    mctx.lineWidth = 2;
    mctx.strokeRect(wm.x * scale, wm.y * scale, wm.width * scale, wm.height * scale);

    const zoomCanvas = zoomCanvasRef.current;
    if (zoomCanvas && originalBitmapRef.current) {
      const zctx = zoomCanvas.getContext('2d');
      zctx.imageSmoothingEnabled = false;
      zctx.clearRect(0, 0, zoomCanvas.width, zoomCanvas.height);
      zctx.drawImage(originalBitmapRef.current, roi.x, roi.y, roi.width, roi.height, 0, 0, zoomCanvas.width, zoomCanvas.height);
      const sx = zoomCanvas.width / roi.width;
      const sy = zoomCanvas.height / roi.height;
      zctx.strokeStyle = '#2563eb';
      zctx.lineWidth = 2;
      zctx.strokeRect((wm.x - roi.x) * sx, (wm.y - roi.y) * sy, wm.width * sx, wm.height * sy);
    }

    const zoomCleanedCanvas = zoomCleanedCanvasRef.current;
    if (zoomCleanedCanvas) {
      const zctx = zoomCleanedCanvas.getContext('2d');
      zctx.imageSmoothingEnabled = false;
      zctx.clearRect(0, 0, zoomCleanedCanvas.width, zoomCleanedCanvas.height);
      zctx.drawImage(offscreen, roi.x, roi.y, roi.width, roi.height, 0, 0, zoomCleanedCanvas.width, zoomCleanedCanvas.height);
      const sx = zoomCleanedCanvas.width / roi.width;
      const sy = zoomCleanedCanvas.height / roi.height;
      zctx.strokeStyle = '#16a34a';
      zctx.lineWidth = 2;
      zctx.strokeRect((wm.x - roi.x) * sx, (wm.y - roi.y) * sy, wm.width * sx, wm.height * sy);
    }
  }, [getBgImg]);

  const applyAutoSettings = useCallback((detectedResult, frame) => {
    const w = frame ? frame.width : 1536;
    const h = frame ? frame.height : 1536;

    const p = detectedResult
      ? {
          gain: detectedResult.gain,
          offsetX: detectedResult.offsetX,
          offsetY: detectedResult.offsetY,
          sizeScale: detectedResult.sizeScale,
        }
      : fallbackPreset(w, h);
    p.maskMode = p.maskMode || 'unblend';

    setSliderRange({
      offsetXMin: -Math.round(w * 0.45),
      offsetXMax: Math.round(w * 0.2),
      offsetYMin: -Math.round(h * 0.45),
      offsetYMax: Math.round(h * 0.2),
    });
    setSettings(p);
    renderTuner(p);
  }, [fallbackPreset, renderTuner]);

  const updateSetting = useCallback((key, value) => {
    setSettings((prev) => {
      const next = { ...prev, [key]: value };
      renderTuner(next);
      return next;
    });
  }, [renderTuner]);

  const resetSliders = useCallback(() => {
    applyAutoSettings(detected, previewFrameRef.current);
  }, [applyAutoSettings, detected]);

  const handleFile = useCallback(async (file) => {
    if (!file || !file.type.startsWith(accept)) return;
    if (isProcessing) return;

    setIsProcessing(true);
    setShowTuner(false);
    setResult(null);
    setError(null);
    fileRef.current = file;

    try {
      if (!engineRef.current) {
        engineRef.current = await createEngine();
      }

      const frame = await grabFrame(file);
      previewFrameRef.current = frame;
      const base = getBase(engineRef.current, frame.width, frame.height);
      baseRef.current = base;

      if (originalBitmapRef.current) originalBitmapRef.current.close();
      originalBitmapRef.current = await createImageBitmap(frame.imageData);

      const bgImg = getBgImg(engineRef.current);
      const det = detectFn(frame.imageData, frame.width, frame.height, bgImg);
      setDetected(det);

      setShowTuner(true);
      applyAutoSettings(det, frame);
      if (tunerRef.current) smoothScrollTo(tunerRef.current);
    } catch (err) {
      console.error(err);
      setError(err.message || String(err));
    } finally {
      setIsProcessing(false);
    }
  }, [accept, isProcessing, createEngine, grabFrame, getBase, getBgImg, detectFn, applyAutoSettings]);

  const runExport = useCallback(async () => {
    const file = fileRef.current;
    const engine = engineRef.current;
    if (!file || !engine) return;

    handleExportAd();
    setShowTuner(false);
    setResult(null);
    setError(null);
    setIsExporting(true);
    setProgress(0);
    if (statusRef.current) smoothScrollTo(statusRef.current);

    try {
      const res = await doExport(
        file,
        engine,
        baseRef.current,
        settings,
        previewFrameRef.current,
        (pct) => setProgress(pct)
      );
      setIsExporting(false);
      setResult(res);
    } catch (err) {
      console.error(err);
      setIsExporting(false);
      setShowTuner(true);
      setError(err.message || String(err));
    }
  }, [doExport, settings]);

  useEffect(() => {
    if (result && resultsRef.current) smoothScrollTo(resultsRef.current);
  }, [result]);

  const onDrop = useCallback((e) => {
    e.preventDefault();
    setIsDragOver(false);
    if (isProcessing) return;
    if (e.dataTransfer.files.length) handleFile(e.dataTransfer.files[0]);
  }, [isProcessing, handleFile]);

  const onDragOver = useCallback((e) => {
    e.preventDefault();
    if (!isProcessing) setIsDragOver(true);
  }, [isProcessing]);

  const onDragLeave = useCallback(() => setIsDragOver(false), []);

  const onInputChange = useCallback((e) => {
    if (!isProcessing && e.target.files.length) handleFile(e.target.files[0]);
    e.target.value = '';
  }, [isProcessing, handleFile]);

  return {
    refs: { tunerRef, statusRef, resultsRef, mainCanvasRef, zoomCanvasRef, zoomCleanedCanvasRef },
    isProcessing,
    isDragOver,
    showTuner,
    detected,
    settings,
    sliderRange,
    isExporting,
    progress,
    result,
    error,
    file: fileRef.current,
    updateSetting,
    resetSliders,
    runExport,
    onDrop,
    onDragOver,
    onDragLeave,
    onInputChange,
  };
}
