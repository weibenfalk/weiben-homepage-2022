import React from 'react';
// Components
import TextCanvas from '../../components/TextCanvas/TextCanvas';
// Styles
import { Wrapper } from './TextDisplay.styles';

type Props = {
  text: string;
  isScroll?: boolean;
  className?: string;
};

const TextDisplay = ({ text, isScroll = true, className = '' }: Props) => (
  <Wrapper className={className}>
    {!isScroll ? <TextCanvas text={text} /> : null}

    <div style={{ opacity: isScroll ? 1 : 0 }} className='container'>
      <TextCanvas text={text + text + text} />
    </div>
    <div style={{ opacity: isScroll ? 1 : 0 }} className='container'>
      <TextCanvas text={text + text + text} />
    </div>
  </Wrapper>
);

export default TextDisplay;
