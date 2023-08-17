import React from 'react';
// Image
import { shufRepMap } from '../../imageMaps';
// Hooks
import { useGetImagesDataUrl } from '../../hooks/useGetImagesDataUrl';
// Styles
import { Wrapper } from './ShufRepButton.styles';

export enum ShufRepButtonType {
  repeat = 0,
  shuffle = 4
}

type Props = {
  type: ShufRepButtonType;
  active: boolean;
  clickHandler?: () => void;
  className?: string;
};

const ShufRepButton = ({ type, active, clickHandler, className = '' }: Props) => {
  const [isClicked, setIsClicked] = React.useState(false);

  const buttons = useGetImagesDataUrl(shufRepMap);

  const handleMouseDown = () => setIsClicked(true);

  const handleMouseUp = () => {
    setIsClicked(false);
    if (clickHandler) clickHandler();
  };

  const buttonToShow = active ? type + 2 : type;

  return (
    <Wrapper className={className}>
      <img
        draggable='false'
        src={buttons[isClicked ? buttonToShow + 1 : buttonToShow]}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
      />
    </Wrapper>
  );
};

export default ShufRepButton;
