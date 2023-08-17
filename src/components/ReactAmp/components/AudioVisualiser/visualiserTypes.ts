export const renderOscilloscope = (
  canvas: HTMLCanvasElement,
  canvasCtx: CanvasRenderingContext2D,
  dataArray: Uint8Array,
  bufferLength: number
) => {
  if (!canvas) return;

  canvasCtx.clearRect(0, 0, canvas.width, canvas.height);

  canvasCtx.fillStyle = 'transparent';
  canvasCtx.fillRect(0, 0, canvas.width, canvas.height);

  canvasCtx.lineWidth = 1;
  canvasCtx.strokeStyle = '#fff';

  canvasCtx.beginPath();

  const sliceWidth = (canvas.width * 1.0) / bufferLength;
  let x = 0;

  for (let i = 0; i < bufferLength; i++) {
    const v = dataArray[i] / 128.0;
    const y = (v * canvas.height) / 2;

    if (i === 0) {
      canvasCtx.moveTo(x, y);
    } else {
      canvasCtx.lineTo(x, y);
    }

    x += sliceWidth;
  }

  canvasCtx.lineTo(canvas.width, canvas.height / 2);
  canvasCtx.stroke();
};

const BAR_COUNT = 19;
const PEAK_DROP_RATE = 0.05;
const BAR_WIDTH = 3;
const PEAK_HEIGHT = 1;
const PEAK_ARRAY: Array<number> = new Array(BAR_COUNT).fill(0);

export const renderBars = (
  canvas: HTMLCanvasElement,
  canvasCtx: CanvasRenderingContext2D,
  dataArray: Uint8Array,
  colorBarColors: Array<string>
) => {
  if (!canvas) return;

  // As the array with data has far more elements than the number of bars,
  // we want to step through the dataArray and grab as many elements as the bars along the spectrum.
  const step = Math.round(dataArray.length / BAR_COUNT);

  canvasCtx.clearRect(0, 0, canvas.width, canvas.height);

  const gradient = canvasCtx.createLinearGradient(0, 0, 0, 15);

  // Apply colors provided from the textfile from the theme
  colorBarColors.forEach((color, i) => gradient.addColorStop((i + 1) / colorBarColors.length, `rgb(${color})`));

  for (var i = 0; i < BAR_COUNT; i++) {
    const barPos = i * 4;
    // Adjust the bar height
    const barHeight = Math.round(dataArray[i * step] / canvas.height);

    // First draw the bar
    canvasCtx.fillStyle = gradient;
    canvasCtx.fillRect(barPos, canvas.height, BAR_WIDTH, -barHeight + PEAK_HEIGHT);

    // Then draw the cap
    canvasCtx.fillStyle = 'rgb(150, 150, 150)';

    // Make the cap animate and sink if it's higher than the current peak
    // Otherwise draw it at the peak
    if (barHeight < PEAK_ARRAY[i]) {
      PEAK_ARRAY[i] = PEAK_ARRAY[i] - PEAK_DROP_RATE;
      canvasCtx.fillRect(barPos, canvas.height - PEAK_ARRAY[i], BAR_WIDTH, PEAK_HEIGHT);
    } else {
      canvasCtx.fillRect(barPos, canvas.height - barHeight, BAR_WIDTH, PEAK_HEIGHT);
      PEAK_ARRAY[i] = barHeight;
    }
  }
};
