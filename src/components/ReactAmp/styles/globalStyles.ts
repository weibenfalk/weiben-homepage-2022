import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
    * {
        user-select: none;
        image-rendering: pixelated;
      }
    
    html {
        display: flex;
        align-items: center;
        justify-content: center ;
        height: 100vh;
        background: grey;
    }
`;
