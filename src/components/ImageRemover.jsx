import { useMediaRemover } from '../hooks/useMediaRemover';
import { grabImageFrame, handleDownloadAd } from '../lib/mediaUtils';
import {
  WatermarkEngine,
  cleanFrame,
  resolveBox,
  applyMaskToRegion,
  removeWatermarkUniform,
  detectWatermarkCandidate,
  getAdaptiveImagePreset,
} from '../lib/watermarkEngine';

async function doImageExport(file, engine, base, settings, previewFrame) {
  const { width, height, imageData } = previewFrame;
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');
  const mode = settings.maskMode || 'unblend';

  if (mode === 'strong') {
    const copy = new ImageData(new Uint8ClampedArray(imageData.data), width, height);
    const wm = resolveBox(base, width, height, settings);
    removeWatermarkUniform(copy, wm, settings.gain);
    ctx.putImageData(copy, 0, 0);
  } else if (mode !== 'unblend') {
    ctx.putImageData(imageData, 0, 0);
    const wm = resolveBox(base, width, height, settings);
    applyMaskToRegion(ctx, wm, mode);
  } else {
    const copy = new ImageData(new Uint8ClampedArray(imageData.data), width, height);
    cleanFrame(engine.bg96, copy, width, height, base, settings);
    ctx.putImageData(copy, 0, 0);
  }

  const blob = await new Promise((r) => canvas.toBlob(r, 'image/png'));
  return {
    originalUrl: URL.createObjectURL(file),
    cleanedUrl: URL.createObjectURL(blob),
    width,
    height,
    filename: `clean_${file.name}`,
  };
}

export default function ImageRemover() {
  const {
    refs, isProcessing, isDragOver, showTuner, detected, settings, sliderRange,
    result, error, updateSetting, resetSliders, runExport, onDrop, onDragOver, onDragLeave, onInputChange,
  } = useMediaRemover({
    accept: 'image/',
    createEngine: WatermarkEngine.create,
    getBase: (engine, w, h) => engine.getWatermarkInfo(w, h),
    getBgImg: (engine) => engine.bg96,
    detectFn: detectWatermarkCandidate,
    fallbackPreset: (w, h) => getAdaptiveImagePreset('new', w, h),
    grabFrame: grabImageFrame,
    doExport: doImageExport,
  });

  return (
    <section id="panel-image" className="card">
      <div className="remover-layout">
        <div className="remover-left">
          <div
            id="img-dropzone"
            className={`dropzone${isDragOver ? ' drag-over' : ''}${isProcessing ? ' loading' : ''}`}
            onClick={() => !isProcessing && document.getElementById('img-input').click()}
            onDragOver={onDragOver}
            onDragLeave={onDragLeave}
            onDrop={onDrop}
          >
            {isProcessing ? (
              <div className="dropzone-loader">
                <div className="dropzone-spinner"></div>
                <p className="dropzone-title text-indigo-600">Processing &amp; Detecting Watermark...</p>
                <p className="dropzone-sub">Please wait, analyzing watermark...</p>
              </div>
            ) : (
              <>
                <div className="dropzone-icon">
                  <iconify-icon icon="ph:upload-simple-bold"></iconify-icon>
                </div>
                <p className="dropzone-title">Upload or drag your Gemini Image</p>
                <p className="dropzone-sub">Supports PNG, JPG, WebP</p>
              </>
            )}
            <input id="img-input" type="file" accept="image/*" className="hidden" onChange={onInputChange} />
          </div>

          {error && <p className="text-center text-xs mt-2" style={{ color: '#dc2626' }}>{error}</p>}

          {detected && (
            <div className={`detect-badge${detected.matchFound ? '' : ' warning'}`}>
              {detected.matchFound ? (
                <>
                  <iconify-icon icon="ph:scan" width="16" style={{ color: '#6366f1' }}></iconify-icon>
                  <span>Auto-Detected: <strong>{detected.name}</strong> ({Math.round(detected.score * 100)}% match)</span>
                </>
              ) : (
                <>
                  <iconify-icon icon="ph:info" width="16" style={{ color: '#d97706' }}></iconify-icon>
                  <span>Standard Preset Applied ({detected.name})</span>
                </>
              )}
            </div>
          )}

          <div className={`tuner-preview-row${showTuner ? '' : ' hidden'}`}>
            <div className="tuner-canvas-box main-box">
              <span className="canvas-title">
                <iconify-icon icon="ph:frame-corners" width="14"></iconify-icon>
                Preview (Full Frame)
              </span>
              <div className="canvas-wrapper">
                <canvas ref={refs.mainCanvasRef} id="img-main-canvas"></canvas>
              </div>
            </div>
            <div className="tuner-canvas-box zoom-box">
              <div className="zoom-card">
                <span className="canvas-title text-blue-600">
                  <iconify-icon icon="ph:magnifying-glass-plus" width="14"></iconify-icon>
                  Zoomed Original
                </span>
                <div className="canvas-wrapper">
                  <canvas ref={refs.zoomCanvasRef} id="img-zoom-canvas" width="200" height="200"></canvas>
                </div>
              </div>
              <div className="zoom-card">
                <span className="canvas-title text-green-600">
                  <iconify-icon icon="ph:check-circle" width="14"></iconify-icon>
                  Zoomed Cleaned
                </span>
                <div className="canvas-wrapper">
                  <canvas ref={refs.zoomCleanedCanvasRef} id="img-zoom-cleaned-canvas" width="200" height="200"></canvas>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div ref={refs.tunerRef} id="img-tuner-container" className={`remover-right${showTuner ? '' : ' hidden'}`}>
          <div className="mode-toggle">
            <span className="mode-toggle-label">Removal Mode</span>
            <div className="mode-toggle-group">
              {[
                { key: 'unblend', label: 'Unblend', icon: 'ph:magic-wand-bold', title: 'Mathematical alpha unblending (default, best quality)' },
                { key: 'strong', label: 'Strong', icon: 'ph:lightning-bold', title: 'Full-strength unblending across the whole box, not just the sparkle shape — use if Unblend leaves residue' },
                { key: 'blur', label: 'Blur', icon: 'ph:drop-half-bold', title: 'Cover the watermark with a blur instead of removing it' },
                { key: 'pixelate', label: 'Pixelate', icon: 'ph:grid-four-bold', title: 'Cover the watermark with a pixelated block instead of removing it' },
                { key: 'blackout', label: 'Blackout', icon: 'ph:square-fill', title: 'Cover the watermark with a solid fill instead of removing it' },
              ].map((m) => (
                <button
                  key={m.key}
                  type="button"
                  className={`mode-btn${(settings.maskMode || 'unblend') === m.key ? ' active' : ''}`}
                  onClick={() => updateSetting('maskMode', m.key)}
                  title={m.title}
                >
                  <iconify-icon icon={m.icon} width="14"></iconify-icon>
                  {m.label}
                </button>
              ))}
            </div>
          </div>

          <div className="tuner-sliders">
            <div className="slider-group">
              <div className="tuner-slider-label">
                <span>Strength (Gain)</span>
                <span>{settings.gain.toFixed(2)}x</span>
              </div>
              <input type="range" min="0.1" max="3" step="0.05" value={settings.gain}
                onChange={(e) => updateSetting('gain', parseFloat(e.target.value))} />
            </div>
            <div className="slider-group">
              <div className="tuner-slider-label">
                <span>Size Scale</span>
                <span>{settings.sizeScale.toFixed(2)}x</span>
              </div>
              <input type="range" min="0.5" max="2" step="0.05" value={settings.sizeScale}
                onChange={(e) => updateSetting('sizeScale', parseFloat(e.target.value))} />
            </div>
            <div className="slider-group">
              <div className="tuner-slider-label">
                <span>Position X</span>
                <span>{settings.offsetX}px</span>
              </div>
              <input type="range" min={sliderRange.offsetXMin} max={sliderRange.offsetXMax} step="1" value={settings.offsetX}
                onChange={(e) => updateSetting('offsetX', parseInt(e.target.value, 10))} />
            </div>
            <div className="slider-group">
              <div className="tuner-slider-label">
                <span>Position Y</span>
                <span>{settings.offsetY}px</span>
              </div>
              <input type="range" min={sliderRange.offsetYMin} max={sliderRange.offsetYMax} step="1" value={settings.offsetY}
                onChange={(e) => updateSetting('offsetY', parseInt(e.target.value, 10))} />
            </div>
          </div>

          <div className="tuner-actions">
            <button className="btn btn-secondary text-xs" onClick={resetSliders}>
              <iconify-icon icon="ph:arrow-counter-clockwise"></iconify-icon> Reset Sliders
            </button>
            <button className="btn btn-primary" onClick={runExport}>
              <iconify-icon icon="ph:eraser"></iconify-icon> Remove &amp; Export Image
            </button>
          </div>
        </div>
      </div>

      <div ref={refs.resultsRef} id="img-results" className={`mt-4${result ? '' : ' hidden'}`}>
        {result && (
          <div className="card">
            <h3 className="font-bold text-center mb-4">Image Watermark Cleaned Successfully!</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-xs mb-2">Original ({result.width}x{result.height}px)</p>
                <div className="checker p-2 text-center">
                  <img src={result.originalUrl} alt="Original image with watermark" style={{ maxHeight: 250, margin: '0 auto', objectFit: 'contain', width: '100%' }} />
                </div>
              </div>
              <div>
                <p className="text-xs mb-2 text-green-600">Cleaned Result</p>
                <div className="checker p-2 text-center">
                  <img src={result.cleanedUrl} alt="Cleaned result image without watermark" style={{ maxHeight: 250, margin: '0 auto', objectFit: 'contain', width: '100%' }} />
                </div>
              </div>
            </div>
            <div className="mt-4 text-center">
              <a href={result.cleanedUrl} download={result.filename} className="btn btn-primary" onClick={handleDownloadAd}>
                <iconify-icon icon="ph:download-simple-bold" width="16"></iconify-icon>
                Download Cleaned PNG
              </a>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
