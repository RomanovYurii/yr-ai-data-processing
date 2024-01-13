import { useEffect, useState } from 'react';
import { useSelector } from '@store/hooks';
import { usePheromonesMatrix } from '@src/hooks/usePheromonesMatrix';

export const useMapCanvas = () => {
  const { vertices } = useSelector((state) => state.vertices);

  const { pheromonesMatrix } = usePheromonesMatrix();

  const [canvasWidth, setCanvasWidth] = useState(0);

  useEffect(() => {
    const canvas = document.querySelector('#mapCanvas') as HTMLCanvasElement;

    const fitToContainer = (canvas: HTMLCanvasElement) => {
      canvas.style.width = '100%';
      canvas.style.height = '100%';
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };

    const i = setInterval(() => {
      if (canvas.width !== 0) clearInterval(i);
      fitToContainer(canvas);
      setCanvasWidth(canvas.width);
    }, 250);
  }, []);

  // Draw on canvas when vertices array changes
  useEffect(() => {
    if (vertices.length === pheromonesMatrix.length) {
      const canvas = document.querySelector('#mapCanvas') as HTMLCanvasElement;
      const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
      ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

      for (let i = 0; i < vertices.length; i++) {
        for (let j = 0; j < vertices.length; j++) {
          if (i !== j) {
            ctx.beginPath();
            ctx.moveTo(vertices[i].x, vertices[i].y);
            ctx.lineTo(vertices[j].x, vertices[j].y);
            ctx.strokeStyle = '#20BD83';
            ctx.lineWidth = pheromonesMatrix[i][j];
            ctx.stroke();
          }
        }
      }
    }
  }, [vertices, pheromonesMatrix]);

  return {
    canvasWidth,
  };
};
