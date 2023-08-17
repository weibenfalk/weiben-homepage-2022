import React from 'react';
// Components
import RangeSlider from '../../components/RangeSlider/RangeSlider';
// Hooks
import { useGetImagesDataUrl } from '../../hooks/useGetImagesDataUrl';
// Images
import { balanceKnobMap, balanceBgMap } from '../../imageMaps';
// Styles
import { Wrapper } from './PanControl.styles';

type Props = {
  panValue: number;
  setPanValue: (panValue: number) => void;
  setIsDraggingBalance: (isDragging: boolean) => void;
  className?: string;
};

const BalanceControl = ({ panValue, setPanValue, setIsDraggingBalance, className }: Props) => {
  const bgImages = useGetImagesDataUrl(balanceBgMap);

  const handleMouseDown = (): void => setIsDraggingBalance(true);
  const handleMouseUp = (): void => setIsDraggingBalance(false);

  React.useEffect(() => {
    // Add some snapping to 0
    if ((panValue < 0.2 && panValue > 0) || (panValue > -0.2 && panValue < 0)) setPanValue(0);
  }, [panValue]);

  return (
    <Wrapper className={className}>
      <img className='background' src={bgImages[Math.floor(Math.abs(panValue) / 0.0358)]} />
      <RangeSlider
        className='slider'
        knobImages={balanceKnobMap}
        width={38}
        height={14}
        min={-1}
        max={1}
        step={0.01}
        value={panValue}
        handleOnChange={setPanValue}
        handleMouseDown={handleMouseDown}
        handleMouseUp={handleMouseUp}
      />
    </Wrapper>
  );
};

export default BalanceControl;
