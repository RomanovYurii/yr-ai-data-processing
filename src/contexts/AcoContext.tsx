import { createContext, useCallback, useState } from 'react';
import { useDispatch, useSelector } from '@store/hooks';
import { usePheromonesMatrix, useProximityMatrix } from '@src/hooks';
import { IndexedVertice, Vertice } from '@store/vertices';
import { useInterval } from '@uidotdev/usehooks';
import { updatePheromonesMatrix } from '@store/data';

type Iteration = { path: IndexedVertice[]; length: number };
type AcoContextValues = {
  start: () => void;
  stop: () => void;
  bestIteration?: Iteration;
  bestIterationNumber?: number;
  currentIterationNumber?: number;
};

export const AcoContext = createContext<AcoContextValues>({
  start: () => {},
  stop: () => {},
});

/* eslint-disable no-loop-func */

export const AcoContextProvider = ({ children }: any) => {
  const dispatch = useDispatch();

  // Selectors
  const { vertices } = useSelector((state) => state.vertices);
  const { numOfAnts, alpha, beta, evaporationRate, pheromoneCoefficient } =
    useSelector((state) => state.config);

  // State
  const [isRunning, setIsRunning] = useState(false);
  const [currentIterationNumber, setCurrentIterationNumber] = useState<
    number | undefined
  >(0);
  const [bestIteration, setBestIteration] = useState<Iteration | undefined>();
  const [bestIterationNumber, setBestIterationNumber] = useState<
    number | undefined
  >();
  // const epochs = useMemo(() => _.chunk(iterations, numOfAnts), [iterations]);
  // const [iterations, setIterations] = useState<Iteration[]>([]);

  // Hooks
  const { pheromonesMatrix } = usePheromonesMatrix();
  const { proximityMatrix } = useProximityMatrix();

  const run = useCallback(() => {
    if (isRunning) {
      let startingVerticeIndex = 0;

      const epoch: Iteration[] = [];

      for (let i = 0; i < numOfAnts; i++) {
        setCurrentIterationNumber((prev) => (prev ?? 0) + 1);
        const iteration: Iteration = {
          path: [],
          length: 0,
        };
        let visitedVertices: IndexedVertice[] = [];

        let currentVerticeIndex = startingVerticeIndex;
        let currentVertice = vertices[startingVerticeIndex];
        while (visitedVertices.length <= vertices.length) {
          const addCurrentVerticeToVisited = () => {
            visitedVertices.push({
              ...currentVertice,
              index: currentVerticeIndex,
            });
          };

          const calculateProbabilityArrayForNextVertices = () => {
            let totalPossibilities = 0;
            for (let i = 0; i < vertices.length; i++) {
              if (visitedVertices.find((vertice) => vertice.index === i))
                continue;

              totalPossibilities +=
                pheromonesMatrix[currentVerticeIndex][i] ** alpha *
                proximityMatrix[currentVerticeIndex][i] ** beta;
            }

            const _probabilities: { index: number; probability: number }[] = [];
            vertices.forEach((_, index) => {
              if (visitedVertices.find((vertice) => vertice.index === index))
                return;

              _probabilities.push({
                index,
                probability: +(
                  (pheromonesMatrix[currentVerticeIndex][index] ** alpha *
                    proximityMatrix[currentVerticeIndex][index] ** beta) /
                  totalPossibilities
                ),
              });
            });

            return _probabilities;
          };

          const getRandomNumber = () => {
            let _randomNumber = Math.random();
            while (_randomNumber === 0) {
              _randomNumber = Math.random();
            }
            return _randomNumber;
          };

          const defineNextVertice = (
            _randomNumber: number,
            _probabilities: { index: number; probability: number }[]
          ) => {
            let nextVerticeIndex = -1;
            let probabilitySum = 0;

            for (let i = 0; i < _probabilities.length; i++) {
              probabilitySum += _probabilities[i].probability;

              if (_randomNumber < probabilitySum) {
                nextVerticeIndex = vertices.findIndex(
                  (_, index) => index === _probabilities[i].index
                );
                break;
              }
            }

            return nextVerticeIndex;
          };

          const updateIteration = () => {
            iteration.path = [...visitedVertices];
          };

          const moveToNextVertice = (_nextVerticeIndex: number) => {
            currentVerticeIndex = _nextVerticeIndex;
            currentVertice = vertices[_nextVerticeIndex];
          };

          addCurrentVerticeToVisited();
          const probabilities = calculateProbabilityArrayForNextVertices();
          if (probabilities.length !== 0) {
            const randomNumber = getRandomNumber();
            const nextVerticeIndex = defineNextVertice(
              randomNumber,
              probabilities
            );
            moveToNextVertice(nextVerticeIndex);
          } else {
            moveToNextVertice(startingVerticeIndex);
          }
          updateIteration();
        }

        const finishLastStep = () => {
          const calculateLength = (a: Vertice, b: Vertice) =>
            Math.sqrt((a.x - b.x) ** 2 + (a.y - b.y) ** 2);

          let _pathLength = 0;
          for (let i = 0; i < visitedVertices.length - 2; i++) {
            _pathLength += calculateLength(
              vertices[visitedVertices[i].index],
              vertices[visitedVertices[i + 1].index]
            );
          }

          // Update iteration data
          iteration.length = _pathLength;
          // setIterations((prev) => [...prev, iteration]);

          if (!bestIteration) {
            setBestIteration({ ...iteration });
            setBestIterationNumber((currentIterationNumber ?? 0) + 1);
          } else if (bestIteration.length > iteration.length) {
            setBestIteration({ ...iteration });
            setBestIterationNumber((currentIterationNumber ?? 0) + 1);
          }

          epoch.push(iteration);
        };
        finishLastStep();

        if (numOfAnts === vertices.length) {
          startingVerticeIndex += 1;
        } else if (numOfAnts < vertices.length) {
          startingVerticeIndex = Math.floor(Math.random() * vertices.length);
        } else {
          startingVerticeIndex = (startingVerticeIndex + 1) % vertices.length;
        }
      }

      // dissolve pheromone
      const evaporatePheromones = () => {
        let _pheromonesMatrix = JSON.parse(JSON.stringify(pheromonesMatrix));

        for (let i = 0; i < _pheromonesMatrix.length; i++) {
          for (let j = 0; j < _pheromonesMatrix[i].length; j++) {
            _pheromonesMatrix[i][j] =
              _pheromonesMatrix[i][j] * ((100 - evaporationRate) / 100);
          }
        }

        return _pheromonesMatrix;
      };

      // add pheromone based on paths
      const addPheromones = (passedPheromonesMatrix: number[][]) => {
        const _pheromonesMatrix = JSON.parse(
          JSON.stringify(passedPheromonesMatrix)
        );

        epoch.forEach((iteration) => {
          const pheromoneToAdd = pheromoneCoefficient / iteration.length;

          // iteration.path.forEach((vertice, idx) => {
          //   if (idx === iteration.path.length - 1) {
          //     _pheromonesMatrix[iteration.path.at(idx)!.index][0] +=
          //       pheromoneToAdd;
          //   } else {
          //     _pheromonesMatrix[iteration.path.at(idx)!.index][
          //       iteration.path.at(idx + 1)!.index
          //     ] += pheromoneToAdd;
          //   }
          // });
          for (let i = 0; i < iteration.path.length - 2; i++) {
            _pheromonesMatrix[iteration.path.at(i)!.index][
              iteration.path.at(i + 1)!.index
            ] += pheromoneToAdd;
          }
        });

        dispatch(updatePheromonesMatrix(_pheromonesMatrix));
      };

      const updatedPheromonesMatrix = evaporatePheromones();
      addPheromones(updatedPheromonesMatrix);
    }
  }, [
    isRunning,
    pheromonesMatrix,
    alpha,
    beta,
    bestIteration,
    dispatch,
    evaporationRate,
    numOfAnts,
    pheromoneCoefficient,
    proximityMatrix,
    vertices,
    currentIterationNumber,
  ]);

  useInterval(run, 250);

  const start = () => {
    setIsRunning(true);
  };

  const stop = () => {
    setIsRunning(false);
  };

  return (
    <AcoContext.Provider
      value={{
        start,
        stop,
        bestIteration,
        bestIterationNumber,
        currentIterationNumber,
      }}
    >
      {children}
    </AcoContext.Provider>
  );
};
