// ── Shared media helpers (ported from legacy/main.js) ──

export function smoothScrollTo(element, offset = 75) {
  if (!element) return;
  setTimeout(() => {
    const rect = element.getBoundingClientRect();
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const targetY = rect.top + scrollTop - offset;
    window.scrollTo({ top: Math.max(0, targetY), behavior: 'smooth' });
  }, 100);
}

export async function grabImageFrame(file) {
  if (typeof createImageBitmap === 'function') {
    try {
      const bmp = await createImageBitmap(file, { imageOrientation: 'from-image' });
      const width = bmp.width;
      const height = bmp.height;
      const c = document.createElement('canvas');
      c.width = width;
      c.height = height;
      const cx = c.getContext('2d', { willReadFrequently: true });
      cx.drawImage(bmp, 0, 0, width, height);
      const imageData = cx.getImageData(0, 0, width, height);
      bmp.close();
      return { width, height, imageData };
    } catch {
      // Fallback to Image element
    }
  }

  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => {
      const w = img.naturalWidth || img.width;
      const h = img.naturalHeight || img.height;
      const c = document.createElement('canvas');
      c.width = w; c.height = h;
      const cx = c.getContext('2d', { willReadFrequently: true });
      cx.drawImage(img, 0, 0, w, h);
      const imageData = cx.getImageData(0, 0, w, h);
      URL.revokeObjectURL(url);
      resolve({ width: w, height: h, imageData });
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error('Could not read image file.'));
    };
    img.src = url;
  });
}

function isFrameMeaningful(imageData) {
  const data = imageData.data;
  let sum = 0, sumSq = 0;
  const len = data.length;
  const step = Math.max(4, Math.floor(len / 2000) * 4);
  let samples = 0;
  for (let i = 0; i < len; i += step) {
    const lum = 0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2];
    sum += lum;
    sumSq += lum * lum;
    samples++;
  }
  if (samples === 0) return false;
  const mean = sum / samples;
  const variance = (sumSq / samples) - (mean * mean);
  return mean > 12 && mean < 245 && variance > 10;
}

export function grabPreviewFrame(file) {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file);
    const v = document.createElement('video');
    v.preload = 'auto';
    v.muted = true;
    v.playsInline = true;
    v.src = url;

    let cleanedUp = false;
    const cleanup = () => {
      if (!cleanedUp) {
        cleanedUp = true;
        URL.revokeObjectURL(url);
        v.removeAttribute('src');
        v.load();
      }
    };

    const globalTimeout = setTimeout(() => {
      cleanup();
      reject(new Error('Timed out waiting for video frame extraction.'));
    }, 10000);

    v.onerror = () => {
      clearTimeout(globalTimeout);
      cleanup();
      reject(new Error('Could not read this video file.'));
    };

    const onReady = async () => {
      v.onloadedmetadata = null;
      v.onloadeddata = null;

      const duration = Number.isFinite(v.duration) && v.duration > 0 ? v.duration : 1;
      const ratios = [0.35, 0.50, 0.20, 0.65, 0.10];
      const timestamps = ratios.map(r => Math.min(Math.max(duration * r, 0.05), Math.max(0.05, duration - 0.05)));

      let bestFrame = null;
      let highestVariance = -1;

      const w = v.videoWidth || 720;
      const h = v.videoHeight || 1280;
      const c = document.createElement('canvas');
      c.width = w;
      c.height = h;
      const cx = c.getContext('2d', { willReadFrequently: true });

      const seekAndCapture = (time) => {
        return new Promise((res) => {
          let done = false;
          const finish = () => {
            if (done) return;
            done = true;
            clearTimeout(seekTimer);
            v.removeEventListener('seeked', onSeeked);
            try {
              cx.drawImage(v, 0, 0, w, h);
              const imageData = cx.getImageData(0, 0, w, h);
              res(imageData);
            } catch {
              res(null);
            }
          };

          const onSeeked = () => {
            setTimeout(finish, 20);
          };

          const seekTimer = setTimeout(() => {
            finish();
          }, 1200);

          v.addEventListener('seeked', onSeeked, { once: true });
          try {
            if (Math.abs(v.currentTime - time) < 0.01) {
              finish();
            } else {
              v.currentTime = time;
            }
          } catch {
            finish();
          }
        });
      };

      for (const t of timestamps) {
        const imageData = await seekAndCapture(t);
        if (!imageData) continue;

        if (isFrameMeaningful(imageData)) {
          clearTimeout(globalTimeout);
          cleanup();
          resolve({ width: w, height: h, imageData });
          return;
        }

        const data = imageData.data;
        let sum = 0, sumSq = 0, samples = 0;
        const step = Math.max(4, Math.floor(data.length / 1000) * 4);
        for (let i = 0; i < data.length; i += step) {
          const lum = 0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2];
          sum += lum;
          sumSq += lum * lum;
          samples++;
        }
        const mean = sum / (samples || 1);
        const variance = (sumSq / (samples || 1)) - (mean * mean);
        if (variance > highestVariance) {
          highestVariance = variance;
          bestFrame = imageData;
        }
      }

      clearTimeout(globalTimeout);
      cleanup();
      if (bestFrame) {
        resolve({ width: w, height: h, imageData: bestFrame });
      } else {
        reject(new Error('Could not extract a readable frame from this video.'));
      }
    };

    if (v.readyState >= 1) {
      onReady();
    } else {
      v.onloadedmetadata = onReady;
      v.onloadeddata = onReady;
    }
  });
}

// ── Monetag ad links ──
const MONETAG_DIRECT_LINK = 'https://omg10.com/4/11542046';
const MONETAG_EXPORT_DIRECT_LINK = 'https://omg10.com/4/11584190';

export function handleDownloadAd() {
  try {
    window.open(MONETAG_DIRECT_LINK, '_blank');
  } catch (e) {
    console.error('Failed to open Monetag direct link:', e);
  }
}

export function handleExportAd() {
  try {
    window.open(MONETAG_EXPORT_DIRECT_LINK, '_blank');
  } catch (e) {
    console.error('Failed to open Monetag export direct link:', e);
  }
}
