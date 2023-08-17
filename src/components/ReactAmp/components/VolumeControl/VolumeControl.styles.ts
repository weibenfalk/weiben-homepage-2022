import styled from 'styled-components';

export const Wrapper = styled.div`
  position: relative;

  .background {
    position: absolute;
    top: 2.5px;
    left: 2px;
    z-index: 0;
  }

  .slider {
    position: absolute;
    top: 0;
    z-index: 1;
  }
`;
