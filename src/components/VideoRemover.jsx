import { useMediaRemover } from '../hooks/useMediaRemover';
import { grabPreviewFrame, handleDownloadAd } from '../lib/mediaUtils';
import { VideoWatermarkEngine } from '../lib/watermarkEngine';

// Fixed starting values for the Video Remover tuner (tuned for the current
// Veo 3 watermark placement) — used for every video instead of running
// auto-detection.
const DEFAULT_VIDEO_SETTINGS = { gain: 0.6, offsetX: -26, offsetY: -24, sizeScale: 1.1 };

async function doVideoExport(file, engine, base, settings, previewFrame, onProgress) {
  const res = await engine.process(file, {
    ...settings,
    onProgress: ({ progress }) => onProgress(Math.round(progress * 100)),
  });
  return {
    originalUrl: res.originalUrl,
    cleanedUrl: res.url,
    width: res.width,
    height: res.height,
    filename: `clean_${file.name}`,
  };
}

export default function VideoRemover() {
  const {
    refs, isProcessing, isDragOver, showTuner, detected, settings, sliderRange,
    isExporting, progress, result, error,
    updateSetting, resetSliders, runExport, onDrop, onDragOver, onDragLeave, onInputChange,
  } = useMediaRemover({
    accept: 'video/',
    createEngine: VideoWatermarkEngine.create,
    getBase: (engine, w, h) => engine.getVeoWatermark(w, h),
    getBgImg: (engine) => engine.sparkleImage,
    detectFn: () => null,
    fallbackPreset: () => DEFAULT_VIDEO_SETTINGS,
    grabFrame: grabPreviewFrame,
    doExport: doVideoExport,
  });

  return (
    <section id="panel-video" className="card">
      <div className="remover-layout">
        <div className="remover-left">
          <div
            id="video-dropzone"
            className={`dropzone${isDragOver ? ' drag-over' : ''}${isProcessing ? ' loading' : ''}`}
            onClick={() => !isProcessing && document.getElementById('video-input').click()}
            onDragOver={onDragOver}
            onDragLeave={onDragLeave}
            onDrop={onDrop}
          >
            {isProcessing ? (
              <div className="dropzone-loader">
                <div className="dropzone-spinner"></div>
                <p className="dropzone-title text-indigo-600">Extracting Best Frame &amp; Analyzing...</p>
                <p className="dropzone-sub">Scanning video frames &amp; auto-detecting watermark...</p>
              </div>
            ) : (
              <>
                <div className="dropzone-icon">
                  <iconify-icon icon="ph:video-bold"></iconify-icon>
                </div>
                <p className="dropzone-title">Upload or drag a Gemini Veo 3 video</p>
                <p className="dropzone-sub">Supports MP4, WebM, MOV</p>
              </>
            )}
            <input id="video-input" type="file" accept="video/*" className="hidden" onChange={onInputChange} />
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
                <canvas ref={refs.mainCanvasRef} id="video-main-canvas"></canvas>
              </div>
            </div>
            <div className="tuner-canvas-box zoom-box">
              <div className="zoom-card">
                <span className="canvas-title text-blue-600">
                  <iconify-icon icon="ph:magnifying-glass-plus" width="14"></iconify-icon>
                  Zoomed Original
                </span>
                <div className="canvas-wrapper">
                  <canvas ref={refs.zoomCanvasRef} id="video-zoom-canvas" width="200" height="200"></canvas>
                </div>
              </div>
              <div className="zoom-card">
                <span className="canvas-title text-green-600">
                  <iconify-icon icon="ph:check-circle" width="14"></iconify-icon>
                  Zoomed Cleaned
                </span>
                <div className="canvas-wrapper">
                  <canvas ref={refs.zoomCleanedCanvasRef} id="video-zoom-cleaned-canvas" width="200" height="200"></canvas>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div ref={refs.tunerRef} id="video-tuner-container" className={`remover-right${showTuner ? '' : ' hidden'}`}>
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
              <iconify-icon icon="ph:eraser"></iconify-icon> Remove &amp; Export Video MP4
            </button>
          </div>
        </div>
      </div>

      <div ref={refs.statusRef} className={`mt-4 text-center${isExporting ? '' : ' hidden'}`}>
        <p className="mb-2">Cleaning &amp; Encoding Video...</p>
        <div className="progress-bar-container">
          <div className="progress-bar-fill" style={{ width: `${progress}%` }}></div>
        </div>
        <p className="progress-text">{progress}% — keep tab open</p>
      </div>

      <div ref={refs.resultsRef} id="video-results" className={`mt-4${result ? '' : ' hidden'}`}>
        {result && (
          <div className="card">
            <h3 className="font-bold text-center mb-4">Video Watermark Cleaned Successfully!</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-xs mb-2">Original Video</p>
                <video src={result.originalUrl} controls playsInline style={{ width: '100%', maxHeight: 280 }}></video>
              </div>
              <div>
                <p className="text-xs mb-2 text-green-600">Cleaned Video</p>
                <video src={result.cleanedUrl} controls playsInline style={{ width: '100%', maxHeight: 280 }}></video>
              </div>
            </div>
            <div className="mt-4 text-center">
              <a href={result.cleanedUrl} download={result.filename} className="btn btn-primary" onClick={handleDownloadAd}>
                <iconify-icon icon="ph:download-simple-bold" width="16"></iconify-icon>
                Download Cleaned Video MP4
              </a>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
