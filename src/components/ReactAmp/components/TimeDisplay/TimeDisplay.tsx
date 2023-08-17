import React from 'react';
// Image
import { numbersMap } from '../../imageMaps';
// Hooks
import { useGetImagesDataUrl } from '../../hooks/useGetImagesDataUrl';
// Helpers
import { getTime1s, getTime10s } from '../../helpers';
// Styles
import { Wrapper } from './TimeDisplay.styles';

type Props = {
  isTimeLeft: boolean;
  setIsTimeLeft: (istimeLeft: boolean) => void;
  totalTime: number;
  playtime: number;
  className?: string;
};

const TimeDisplay = ({ isTimeLeft, setIsTimeLeft, totalTime, playtime, className = '' }: Props) => {
  const numbers = useGetImagesDataUrl(numbersMap);

  const displayedTime = isTimeLeft ? totalTime - playtime : playtime;

  const seconds = displayedTime % 60;
  const minutes = Math.floor((displayedTime / 60) % 60);

  const handleClick = () => setIsTimeLeft(!isTimeLeft);

  return (
    <Wrapper className={className} onClick={handleClick} isTimeLeft={isTimeLeft}>
      <img draggable='false' className='minus' src={numbers[10]} />
      <img draggable='false' src={numbers[getTime10s(minutes)]} />
      <img draggable='false' src={numbers[getTime1s(minutes)]} />
      <img draggable='false' src={numbers[getTime10s(seconds)]} />
      <img draggable='false' src={numbers[getTime1s(seconds)]} />
    </Wrapper>
  );
};

export default TimeDisplay;
