import React from 'react';
// Components
import RangeSlider from '../../components/RangeSlider/RangeSlider';
// Hooks
import { useGetImagesDataUrl } from '../../hooks/useGetImagesDataUrl';
// Images
import { scrubberMap, scrubberBgMap } from '../../imageMaps';
// Styles
import { Wrapper } from './Scrubber.styles';

type Props = {
  scrubtime: number;
  setScrubtime: (scrubtime: number) => void;
  totalTime: number;
  setIsDraggingScrubber: (isDragging: boolean) => void;
  displayHandle: boolean;
  handleScrubRelease: (value: number) => void;
  className?: string;
};

const Scrubber = ({
  scrubtime,
  setScrubtime,
  totalTime,
  setIsDraggingScrubber,
  displayHandle,
  handleScrubRelease,
  className
}: Props) => {
  const [bgImage] = useGetImagesDataUrl(scrubberBgMap);

  const handleMouseUp = (value: number) => {
    handleScrubRelease(value);
    setIsDraggingScrubber(false);
  };

  const handleOnChange = (value: number) => setScrubtime((value / 100) * totalTime);
  const handleMouseDown = () => setIsDraggingScrubber(true);

  return (
    <Wrapper className={className}>
      <img className='background' src={bgImage} />
      {displayHandle ? (
        <RangeSlider
          className='slider'
          knobImages={scrubberMap}
          width={249}
          height={10}
          min={0}
          max={100}
          step={1}
          value={!scrubtime || !totalTime ? 0 : Math.round((scrubtime / totalTime) * 100)}
          handleOnChange={handleOnChange}
          handleMouseUp={handleMouseUp}
          handleMouseDown={handleMouseDown}
        />
      ) : null}
    </Wrapper>
  );
};

export default Scrubber;
