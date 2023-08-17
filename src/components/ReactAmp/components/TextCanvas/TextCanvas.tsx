import React from 'react';
// Image
import textImageMap from '../../assets/TEXT.BMP';
// CharacterMap
import { characterMap } from '../../helpers';

type Props = {
  text: string;
};

const TextCanvas = ({ text = 'This is a test text' }: Props) => {
  const [canvasWidth, setCanvasWidth] = React.useState(0);

  return (
    <canvas
      ref={canvas => {
        if (canvas) {
          const context = canvas.getContext('2d');

          if (!context) return;

          const image = document.createElement('img');
          image.src = textImageMap;

          image.onload = () => {
            const lowerCaseString = text.toLowerCase();

            let destY = 0;

            // Loop through each char and draw on canvas
            [...lowerCaseString].forEach((char, i) => {
              type characters = keyof typeof characterMap;
              const charCoords = characterMap[char as characters];

              if (char === ' ') {
                destY += 4;
                return;
              }

              context.drawImage(
                image,
                charCoords[0],
                charCoords[1],
                charCoords[2],
                charCoords[3],
                destY,
                0,
                charCoords[2],
                charCoords[3]
              );

              destY += charCoords[2] + 1;
            });

            setCanvasWidth(destY);
          };
        }
      }}
      width={canvasWidth}
      height='10'
    />
  );
};

export default TextCanvas;
