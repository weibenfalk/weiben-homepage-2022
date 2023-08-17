import React from 'react';
// Colors
import colors from '../../assets/VISCOLOR.TXT';
// Hooks
import { useRequestAnimationFrame } from '../../hooks/useRequestAnimationFrame';
// Visualisertypes
import { renderBars, renderOscilloscope } from './visualiserTypes';

export enum VisualiserType {
  'OSC' = 'oscilloscope',
  'BAR' = 'bar'
}

type Props = {
  isPlaying: boolean;
  type: VisualiserType;
  analyser: React.MutableRefObject<AnalyserNode | undefined>;
  dataArray: React.MutableRefObject<Uint8Array | undefined>;
  bufferLength: React.MutableRefObject<number>;
  className?: string;
};

const CANVAS_WIDTH = 77;
const CANVAS_HEIGHT = 14;

const getColorsFromTextfile = (textfile: string): Array<string> => {
  // First split by new line
  const rows = textfile.split('\n');

  const numberPattern = /\d+/g;
  // Match the pattern from the regex and only return numbers
  // Then just keep the 3 first numbers that are the RGB colors
  // Lastly join them into a string instead of an array
  const colorArray = rows.map(row => {
    return row.match(numberPattern)?.splice(0, 3).join();
  });

  // We need the the 2:nd element in the array and counting from that 16 more elements for the color bars
  return colorArray.splice(2, 16) as string[];
};

const AudioVisualiser = ({ isPlaying, analyser, dataArray, bufferLength, type, className = '' }: Props) => {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);

  // Memoize with a callback so that the useRequestAnimationFrame hook don't run unnessecarily
  const barsOrOsc = (type: VisualiserType) => {
    if (canvasRef.current && analyser.current && dataArray.current) {
      const canvasCtx = canvasRef.current.getContext('2d') as CanvasRenderingContext2D;

      analyser.current.getByteFrequencyData(dataArray.current);

      if (type === VisualiserType.BAR) {
        renderBars(canvasRef.current, canvasCtx, dataArray.current, getColorsFromTextfile(colors));
      } else {
        analyser.current.getByteTimeDomainData(dataArray.current);
        renderOscilloscope(canvasRef.current, canvasCtx, dataArray.current, bufferLength.current);
      }
    }
  };

  useRequestAnimationFrame(
    isPlaying,
    React.useCallback(() => barsOrOsc(type), [type])
  );

  return <canvas className={className} width={CANVAS_WIDTH} height={CANVAS_HEIGHT} ref={canvasRef} />;
};

export default AudioVisualiser;
