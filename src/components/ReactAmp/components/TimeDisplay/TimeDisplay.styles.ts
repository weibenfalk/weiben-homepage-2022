import styled from 'styled-components';

type Props = {
  isTimeLeft: boolean;
};

export const Wrapper = styled.div<Props>`
  display: flex;
  align-items: center;
  gap: 2.5px;

  img:nth-of-type(1) {
    margin-right: 3px;
    opacity: ${props => (props.isTimeLeft ? 100 : 0)};
  }

  img:nth-of-type(3) {
    margin-right: 6.5px;
  }
`;
