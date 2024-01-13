import { useDispatch, useSelector } from '@store/hooks';
import { useEffect, useMemo, useState } from 'react';
import { updateProximityMatrix } from '@store/data';
import _ from 'lodash';

export const useProximityMatrix = () => {
  const dispatch = useDispatch();

  const { vertices } = useSelector((state) => state.vertices);
  const { attractivenessScore } = useSelector((state) => state.config);
  const { proximityMatrix } = useSelector((state) => state.data);

  const [distancesMatrix, setDistancesMatrix] = useState<number[][]>([]);

  const suggestedAttractivenessScore = useMemo(
    () =>
      +(
        0.6 *
        (_.min(
          distancesMatrix.map((row) => _.min(row.filter((v) => v !== 0)))
        ) ?? 0)
      ).toFixed(2),
    [distancesMatrix]
  );

  useEffect(() => {
    const _proximityMatrix: number[][] = [];
    const _distancesMatrix: number[][] = [];
    for (let i = 0; i < vertices.length; i++) {
      _proximityMatrix[i] = [];
      _distancesMatrix[i] = [];

      for (let j = 0; j < vertices.length; j++) {
        if (!_proximityMatrix[i][j]) _proximityMatrix[i][j] = 0;
        if (!_distancesMatrix[i][j]) _distancesMatrix[i][j] = 0;

        if (i === j) {
          _proximityMatrix[i][j] = 0;
          _distancesMatrix[i][j] = 0;
        } else {
          _distancesMatrix[i][j] = +Math.sqrt(
            (vertices[i].x - vertices[j].x) ** 2 +
              (vertices[i].y - vertices[j].y) ** 2
          ).toFixed(5);

          _proximityMatrix[i][j] = +(
            attractivenessScore /
            Math.sqrt(
              (vertices[i].x - vertices[j].x) ** 2 +
                (vertices[i].y - vertices[j].y) ** 2
            )
          ).toFixed(5);
        }
      }
    }

    setDistancesMatrix(_distancesMatrix);
    dispatch(updateProximityMatrix(_proximityMatrix));
  }, [vertices, attractivenessScore, dispatch]);

  return {
    proximityMatrix,
    suggestedAttractivenessScore,
  };
};
