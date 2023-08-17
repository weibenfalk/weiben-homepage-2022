import React from 'react';
// Components
import ControlButton from '../../components/ControlButton/ControlButton';
// Types
import { ControlButtonType } from '../../components/ControlButton/ControlButton';
// Styles
import { Wrapper } from './ButtonGroup.styles';

type Props = {
  handlePlay: () => void;
  handleStop: () => void;
  handlePause: () => void;
  handlePreviousTrack: () => void;
  handleNextTrack: () => void;
  className?: string;
};

const ControlButtonGroup = ({
  handlePlay,
  handleStop,
  handlePause,
  handlePreviousTrack,
  handleNextTrack,
  className = ''
}: Props) => (
  <Wrapper className={className}>
    <ControlButton type={ControlButtonType.previous} clickHandler={handlePreviousTrack} />
    <ControlButton type={ControlButtonType.play} clickHandler={handlePlay} />
    <ControlButton type={ControlButtonType.pause} clickHandler={handlePause} />
    <ControlButton type={ControlButtonType.stop} clickHandler={handleStop} />
    <ControlButton type={ControlButtonType.next} clickHandler={handleNextTrack} />
    <ControlButton className='eject-button' type={ControlButtonType.eject} clickHandler={() => console.log('Eject!')} />
  </Wrapper>
);

export default ControlButtonGroup;
