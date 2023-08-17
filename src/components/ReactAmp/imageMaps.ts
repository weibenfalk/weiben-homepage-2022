// Images
import mainImageMap from './assets/MAIN.BMP';
import titleBarImageMap from './assets/TITLEBAR.BMP';
import playPauseImageMap from './assets/PLAYPAUS.BMP';
import controlButtonsImageMap from './assets/CBUTTONS.BMP';
import monoStereoImageMap from './assets/MONOSTER.BMP';
import shufRepImageMap from './assets/SHUFREP.BMP';
import textImageMap from './assets/TEXT.BMP';
import numbersImageMap from './assets/NUMBERS.BMP';
import volumeImageMap from './assets/VOLUME.BMP';
import posBarImageMap from './assets/POSBAR.BMP';
import balanceImageMap from './assets/BALANCE.BMP';

export type ImageCoordsType = {
  x: number;
  y: number;
  width: number;
  height: number;
};

export type ImageMapType = {
  imageMap: string;
  images: Array<ImageCoordsType>;
};

const createImages = (
  width: number,
  height: number,
  totalAmount: number,
  padding: number,
  xOrY: 'x' | 'y' = 'y',
  x = 0,
  y = 0
): Array<ImageCoordsType> => {
  const images = [];

  for (let i = 0; i < totalAmount; i++) {
    images.push({
      x: xOrY === 'x' ? i * (width + padding) : x,
      y: xOrY === 'y' ? i * (height + padding) : y,
      width: width,
      height: height
    });
  }

  return images;
};

export const balanceKnobMap: ImageMapType = {
  imageMap: balanceImageMap as string,
  images: [
    {
      x: 15,
      y: 422,
      width: 14,
      height: 11
    },
    {
      x: 0,
      y: 422,
      width: 14,
      height: 11
    }
  ]
};

export const eqPlMap: ImageMapType = {
  imageMap: shufRepImageMap as string,
  images: [
    {
      x: 0,
      y: 61,
      width: 23,
      height: 12
    },
    {
      x: 46,
      y: 61,
      width: 23,
      height: 12
    },
    {
      x: 0,
      y: 73,
      width: 23,
      height: 12
    },
    {
      x: 46,
      y: 73,
      width: 23,
      height: 12
    },
    {
      x: 23,
      y: 61,
      width: 22,
      height: 12
    },
    {
      x: 69,
      y: 61,
      width: 22,
      height: 12
    },
    {
      x: 23,
      y: 73,
      width: 22,
      height: 12
    },
    {
      x: 69,
      y: 73,
      width: 22,
      height: 12
    }
  ]
};

export const balanceBgMap: ImageMapType = {
  imageMap: balanceImageMap as string,
  images: createImages(38, 14, 28, 1, 'y', 9)
};

export const scrubberBgMap: ImageMapType = {
  imageMap: posBarImageMap as string,
  images: [
    {
      x: 0,
      y: 0,
      width: 249,
      height: 10
    }
  ]
};

export const scrubberMap: ImageMapType = {
  imageMap: posBarImageMap as string,
  images: [
    {
      x: 249,
      y: 0,
      width: 28,
      height: 10
    },
    {
      x: 279,
      y: 0,
      width: 28,
      height: 10
    }
  ]
};

export const numbersMap: ImageMapType = {
  imageMap: numbersImageMap,
  images: [
    ...createImages(9, 13, 10, 0, 'x'),
    {
      x: 19,
      y: 6,
      width: 5,
      height: 1
    }
  ]
};

export const shufRepMap: ImageMapType = {
  imageMap: shufRepImageMap as string,
  images: [
    {
      x: 0,
      y: 0,
      width: 28,
      height: 15
    },
    {
      x: 0,
      y: 15,
      width: 28,
      height: 15
    },
    {
      x: 0,
      y: 30,
      width: 28,
      height: 15
    },
    {
      x: 0,
      y: 45,
      width: 28,
      height: 15
    },
    {
      x: 28,
      y: 0,
      width: 47,
      height: 15
    },
    {
      x: 28,
      y: 15,
      width: 47,
      height: 15
    },
    {
      x: 28,
      y: 30,
      width: 47,
      height: 15
    },
    {
      x: 28,
      y: 45,
      width: 47,
      height: 15
    }
  ]
};

export const controlButtonsMap: ImageMapType = {
  imageMap: controlButtonsImageMap as string,
  images: [
    {
      x: 0,
      y: 0,
      width: 22,
      height: 18
    },
    {
      x: 0,
      y: 18,
      width: 22,
      height: 18
    },
    {
      x: 23,
      y: 0,
      width: 22,
      height: 18
    },
    {
      x: 23,
      y: 18,
      width: 22,
      height: 18
    },
    {
      x: 46,
      y: 0,
      width: 22,
      height: 18
    },
    {
      x: 46,
      y: 18,
      width: 22,
      height: 18
    },
    {
      x: 69,
      y: 0,
      width: 22,
      height: 18
    },
    {
      x: 69,
      y: 18,
      width: 22,
      height: 18
    },
    {
      x: 92,
      y: 0,
      width: 22,
      height: 18
    },
    {
      x: 92,
      y: 18,
      width: 22,
      height: 18
    },
    {
      x: 114,
      y: 0,
      width: 22,
      height: 16
    },
    {
      x: 114,
      y: 16,
      width: 22,
      height: 16
    }
  ]
};

export const playPauseStopMap: ImageMapType = {
  imageMap: playPauseImageMap,
  images: [
    {
      x: 0,
      y: 0,
      width: 9,
      height: 9
    },
    {
      x: 9,
      y: 0,
      width: 9,
      height: 9
    },
    {
      x: 18,
      y: 0,
      width: 9,
      height: 9
    }
  ]
};

export const titleBarMap: ImageMapType = {
  imageMap: titleBarImageMap as string,
  images: [
    {
      x: 27,
      y: 0,
      width: 275,
      height: 14
    },
    {
      x: 305,
      y: 0,
      width: 7,
      height: 43
    }
  ]
};

export const mainMap: ImageMapType = {
  imageMap: mainImageMap as string,
  images: [
    {
      x: 0,
      y: 0,
      width: 275,
      height: 116
    }
  ]
};

export const monoStereoMap: ImageMapType = {
  imageMap: monoStereoImageMap as string,
  images: [
    {
      x: 0,
      y: 0,
      width: 29,
      height: 12
    },
    {
      x: 0,
      y: 12,
      width: 29,
      height: 12
    },
    {
      x: 29,
      y: 0,
      width: 29,
      height: 12
    },
    {
      x: 29,
      y: 12,
      width: 29,
      height: 12
    }
  ]
};

export const volumeKnobMap: ImageMapType = {
  imageMap: volumeImageMap as string,
  images: [
    {
      x: 15,
      y: 422,
      width: 14,
      height: 11
    },
    {
      x: 0,
      y: 422,
      width: 14,
      height: 11
    }
  ]
};

export const volumeBgMap = {
  imageMap: volumeImageMap as string,
  images: createImages(68, 14, 28, 1)
};
