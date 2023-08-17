import styled from 'styled-components';

export const Wrapper = styled.div`
  position: relative;

  .title-bar {
    position: absolute;
    top: 0;
    left: 0;
  }

  .play-pause-stop {
    position: absolute;
    top: 28px;
    left: 25px;
  }

  .display-buttons {
    position: absolute;
    top: 22px;
    left: 11px;
  }

  .mono-stereo {
    position: absolute;
    top: 39px;
    right: 7px;
  }
`;
