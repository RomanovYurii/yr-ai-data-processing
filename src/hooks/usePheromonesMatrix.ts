import { useEffect } from 'react';
import { useDispatch, useSelector } from '@store/hooks';
import { updatePheromonesMatrix } from '@store/data';

export const usePheromonesMatrix = () => {
  const dispatch = useDispatch();

  const { vertices } = useSelector((state) => state.vertices);
  const { basePheromone } = useSelector((state) => state.config);
  const { pheromonesMatrix } = useSelector((state) => state.data);

  useEffect(() => {
    const _pheromonesMatrix: number[][] = [];

    for (let i = 0; i < vertices.length; i++) {
      _pheromonesMatrix[i] = [];

      for (let j = 0; j < vertices.length; j++) {
        if (!_pheromonesMatrix[i][j]) _pheromonesMatrix[i][j] = 0;

        if (i === j) _pheromonesMatrix[i][j] = 0;
        else _pheromonesMatrix[i][j] = basePheromone;
      }
    }

    dispatch(updatePheromonesMatrix(_pheromonesMatrix));
  }, [vertices, basePheromone, dispatch]);

  return {
    pheromonesMatrix,
  };
};
