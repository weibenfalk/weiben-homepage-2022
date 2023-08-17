import React from 'react';
// Hooks
import { useGetImagesDataUrl } from '../../hooks/useGetImagesDataUrl';
// Styles
import { Wrapper } from './RangeSlider.styles';
// Types
import type { ImageMapType } from '../../imageMaps';

type Props = {
  knobImages: ImageMapType;
  width: number;
  height: number;
  value: number;
  min?: number;
  max?: number;
  step?: number;
  handleMouseDown?: (value: number) => void;
  handleMouseUp?: (value: number) => void;
  handleOnChange?: (value: number) => void;
  className?: string;
};

const RangeSlider = ({
  knobImages,
  width,
  height,
  value,
  min = 0,
  max = 100,
  step = 1,
  handleMouseDown,
  handleMouseUp,
  handleOnChange,
  className
}: Props) => {
  const [knob, knobClicked] = useGetImagesDataUrl(knobImages);
  const [clicked, setClicked] = React.useState(false);

  const onMouseDown = (event: React.MouseEvent<HTMLInputElement>) => {
    setClicked(true);
    if (handleMouseDown) handleMouseDown(Number(event.currentTarget.value));
  };

  const onMouseUp = (event: React.MouseEvent<HTMLInputElement>) => {
    setClicked(false);
    if (handleMouseUp) handleMouseUp(Number(event.currentTarget.value));
  };

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (handleOnChange) handleOnChange(Number(event.currentTarget.value))
  };

  return (
    <Wrapper
      image={clicked ? knobClicked : knob}
      width={width}
      height={height}
      knobWidth={knobImages.images[0].width}
      knobHeight={knobImages.images[0].height}
    >
      <input
        className={className}
        type='range'
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={onChange}
        onMouseDown={onMouseDown}
        onMouseUp={onMouseUp}
      />
    </Wrapper>
  );
};

export default RangeSlider;
