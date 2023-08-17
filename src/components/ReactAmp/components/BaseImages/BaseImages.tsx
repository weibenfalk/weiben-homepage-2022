import React from 'react';
// Images
import { mainMap, titleBarMap, playPauseStopMap } from '../../imageMaps';
// Hooks
import { useGetImagesDataUrl } from '../../hooks/useGetImagesDataUrl';
// Styles
import { Wrapper } from './BaseImages.styles';

type Props = {
  isPlaying: boolean;
  isPaused: boolean;
};

const BaseImages = ({ isPlaying, isPaused }: Props) => {
  const [main] = useGetImagesDataUrl(mainMap);
  const [titleBar, displayMenu] = useGetImagesDataUrl(titleBarMap);
  const [play, pause, stop] = useGetImagesDataUrl(playPauseStopMap);

  return (
    <Wrapper>
      <img draggable='false' className='' src={main} />
      <img draggable='false' className='title-bar' src={titleBar} />
      <img draggable='false' className='display-buttons' src={displayMenu} />
      <img draggable='false' className='play-pause-stop' src={isPlaying ? play : isPaused ? pause : stop} />
    </Wrapper>
  );
};

export default BaseImages;
