import React from 'react';
// Components
import RangeSlider from '../../components/RangeSlider/RangeSlider';
// Hooks
import { useGetImagesDataUrl } from '../../hooks/useGetImagesDataUrl';
// Images
import { volumeKnobMap, volumeBgMap } from '../../imageMaps';
// Styles
import { Wrapper } from './VolumeControl.styles';

type Props = {
  volume: number;
  setVolume: (volume: number) => void;
  setIsDraggingVolume: (isDragging: boolean) => void;
  className?: string;
};

const VolumeControl = ({ volume, setVolume, setIsDraggingVolume, className }: Props) => {
  const bgImages = useGetImagesDataUrl(volumeBgMap);

  const handleMouseDown = (): void => setIsDraggingVolume(true);
  const handleMouseUp = (): void => setIsDraggingVolume(false);

  return (
    <Wrapper className={className}>
      <img className='background' src={bgImages[Math.floor(volume / 0.0358)]} />
      <RangeSlider
        className='slider'
        knobImages={volumeKnobMap}
        width={65}
        height={14}
        min={0}
        max={1}
        step={0.01}
        value={volume}
        handleOnChange={setVolume}
        handleMouseDown={handleMouseDown}
        handleMouseUp={handleMouseUp}
      />
    </Wrapper>
  );
};

export default VolumeControl;
