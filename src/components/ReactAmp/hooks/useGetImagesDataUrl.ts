import React from 'react';
// Types
import type { ImageMapType } from '../imageMaps';

export type ImageCoordsType = {
  imageMap: string;
  x: number;
  y: number;
  width: number;
  height: number;
};

export const useGetImagesDataUrl = (imageMap: ImageMapType) => {
  const [imgDataUrl, setImgDataUrl] = React.useState([] as Array<string>);

  React.useEffect(() => {
    const getDataUrl = async () => {
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');

      if (!context) throw new Error('No context!');

      const decodeImage = async () => {
        const dataUrlImages = [] as Array<string>;
        const image = new Image();
        image.src = imageMap.imageMap;

        for (const imageObject of imageMap.images) {
          canvas.width = imageObject.width;
          canvas.height = imageObject.height;

          await image.decode();

          context.drawImage(
            image,
            imageObject.x,
            imageObject.y,
            imageObject.width,
            imageObject.height,
            0,
            0,
            imageObject.width,
            imageObject.height
          );
          dataUrlImages.push(canvas.toDataURL());
        }

        setImgDataUrl(dataUrlImages);
      };

      decodeImage();
    };

    getDataUrl();
  }, [imageMap]);

  return imgDataUrl;
};
