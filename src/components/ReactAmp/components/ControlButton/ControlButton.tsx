import React from 'react';
// Image
import { controlButtonsMap } from '../../imageMaps';
// Hooks
import { useGetImagesDataUrl } from '../../hooks/useGetImagesDataUrl';
// Styles
import { Wrapper } from './ControlButton.styles';

export enum ControlButtonType {
  previous = 0,
  play = 2,
  pause = 4,
  stop = 6,
  next = 8,
  eject = 10
}

type Props = {
  type: ControlButtonType;
  clickHandler?: () => void;
  className?: string;
};

const ControlButton = ({ type, clickHandler, className = '' }: Props) => {
  const [isClicked, setIsClicked] = React.useState(false);

  const buttons = useGetImagesDataUrl(controlButtonsMap);

  const handleMouseDown = () => {
    if (clickHandler) clickHandler();
    setIsClicked(true);
  };

  const handleMouseUp = () => setIsClicked(false);

  return (
    <Wrapper className={className}>
      <img
        draggable={false}
        src={buttons[isClicked ? type + 1 : type]}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseLeave={() => setIsClicked(false)}
      />
    </Wrapper>
  );
};

export default ControlButton;
