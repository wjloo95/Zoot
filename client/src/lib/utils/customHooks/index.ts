import { useState, useEffect } from 'react';

export const useViewport = (initialView: any) => {
  const [viewport, setViewport] = useState(initialView);

  const resize = () => {
    setViewport((old: any) => ({ ...old, width: '100%' }));
  };

  useEffect(() => {
    window.addEventListener('resize', resize);
    return () => {
      window.removeEventListener('resize', resize);
    };
  }, []);

  return [viewport, setViewport];
};
