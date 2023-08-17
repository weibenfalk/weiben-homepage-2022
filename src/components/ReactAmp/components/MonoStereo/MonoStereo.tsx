import React from 'react';
// Images
import { monoStereoMap } from '../../imageMaps';
// Hooks
import { useGetImagesDataUrl } from '../../hooks/useGetImagesDataUrl';
// Styles
import { Wrapper } from './MonoStereo.styles';

type Props = {
  mono?: boolean;
  stereo?: boolean;
  className?: string;
};

const MonoStereo = ({ mono = false, stereo = true, className = '' }: Props) => {
  const images = useGetImagesDataUrl(monoStereoMap);

  return (
    <Wrapper className={className}>
      <img draggable='false' src={images[mono ? 2 : 3]} />
      <img draggable='false' src={images[stereo ? 0 : 1]} />
    </Wrapper>
  );
};

export default MonoStereo;
