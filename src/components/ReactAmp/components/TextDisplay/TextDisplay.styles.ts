import styled from 'styled-components';

export const Wrapper = styled.div`
  --duration: 15s;

  display: flex;
  overflow: hidden;
  user-select: none;
  position: relative;
  font-size: 9px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  white-space: nowrap;
  width: 152px;
  height: 10px;
  margin: 0;
  padding: 0;

  p {
    display: inline-block;
    margin: 0;
    padding: 0;
  }

  .container {
    display: flex;
    gap: 5px;
    animation: scroll var(--duration) steps(60, end) infinite;

    @keyframes scroll {
      0% {
        transform: translateX(0);
      }

      100% {
        transform: translateX(-100%);
      }
    }
  }
`;
