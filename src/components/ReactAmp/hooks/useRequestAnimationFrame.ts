import React from 'react';

export const useRequestAnimationFrame = (isAnimating: boolean, callback: any): void => {
  const requestRef = React.useRef<number | null>(null);

  const animate = () => {
    requestRef.current = requestAnimationFrame(animate);
    callback();
  };

  React.useEffect(() => {
    if (isAnimating) requestRef.current = requestAnimationFrame(animate);

    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [isAnimating, callback]);
};
