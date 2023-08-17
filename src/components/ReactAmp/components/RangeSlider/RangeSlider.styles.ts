import styled from 'styled-components';
// Image

type Props = {
  image: string;
  width: number;
  height: number;
  knobWidth: number;
  knobHeight: number;
};

export const Wrapper = styled.div<Props>`
  user-select: none;
  
  input[type='range'] {
    -webkit-appearance: none;
    background: transparent;
    width: ${props => `${props.width}px`};
    height: ${props => `${props.height}px`};

    &::-webkit-slider-thumb {
      -webkit-appearance: none;
      background-image: ${props => `url('${props.image}')`};
      width: ${props => `${props.knobWidth}px`};
      height: ${props => `${props.knobHeight}px`};
    }
  }
`;
