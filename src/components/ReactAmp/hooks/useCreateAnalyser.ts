import React from 'react';

type AnalyserReturnType = {
  analyser: React.MutableRefObject<AnalyserNode | undefined>;
  bufferLength: React.MutableRefObject<number>;
  dataArray: React.MutableRefObject<Uint8Array | undefined>;
};

export const useCreateAnalyser = (context?: AudioContext, source?: MediaElementAudioSourceNode): AnalyserReturnType => {
  const analyser = React.useRef<AnalyserNode | undefined>(undefined);
  const bufferLength = React.useRef(0);
  const dataArray = React.useRef<Uint8Array | undefined>(undefined);

  React.useEffect(() => {
    if (context && source && !analyser.current && !dataArray.current) {
      analyser.current = context.createAnalyser();
      analyser.current.fftSize = 512;

      bufferLength.current = analyser.current.frequencyBinCount;
      dataArray.current = new Uint8Array(bufferLength.current);
      analyser.current.getByteTimeDomainData(dataArray.current);

      source.connect(analyser.current);
    }
  }, [context, source]);

  return { analyser, bufferLength, dataArray };
};
