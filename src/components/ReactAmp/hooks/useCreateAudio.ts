import React from 'react';

export const useCreateAudio = (audioRef: React.RefObject<HTMLMediaElement>) => {
  const context = React.useRef<AudioContext>();
  const source = React.useRef<MediaElementAudioSourceNode>();
  const panNode = React.useRef<StereoPannerNode>();

  const play = () => {
    if (!context.current && audioRef.current) {
      context.current = new AudioContext();
      source.current = context.current.createMediaElementSource(audioRef.current);

      // Need this to be able to pan the audio
      panNode.current = context.current.createStereoPanner();
      source.current.connect(panNode.current);

      panNode.current.connect(context.current.destination);
    }

    if (audioRef.current) audioRef.current.play();
  };

  const stop = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  };

  const pause = () => {
    if (audioRef.current) audioRef.current.pause();
  };

  return { play, stop, pause, context: context.current, source: source.current, panNode: panNode.current };
};
