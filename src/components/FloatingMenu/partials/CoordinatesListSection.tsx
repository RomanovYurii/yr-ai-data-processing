import React, { useContext } from 'react';
import { StyledClickableText } from '@components/FloatingMenu/FloatingMenu.styled';
import { useToggle } from '@uidotdev/usehooks';
import { useDispatch, useSelector } from '@src/store/hooks';
import { Button } from '@mui/joy';
import { toggleShowIndexes } from '@store/vertices';
import { AcoContext } from '@src/contexts';

export const CoordinatesListSection = () => {
  const dispatch = useDispatch();
  const { vertices, showIndexes } = useSelector((state) => state.vertices);

  const { currentIterationNumber, bestIteration, bestIterationNumber } =
    useContext(AcoContext);

  const [showCoordinates, toggleShowCoordinates] = useToggle(false);

  return (
    <div>
      <StyledClickableText onClick={() => toggleShowCoordinates()}>
        Vertices list (click to show/hide)
      </StyledClickableText>

      {showCoordinates && (
        <>
          <ol start={0}>
            {vertices.map((vertice, idx) => (
              <li key={idx}>
                x: {vertice.x.toFixed(2)}, y: {vertice.y.toFixed(2)}
              </li>
            ))}
          </ol>

          {!!currentIterationNumber && (
            <p>Current iteration #{currentIterationNumber}</p>
          )}

          {bestIteration && (
            <p>
              <b>Best iteration (#{bestIterationNumber}):</b>
              <br />
              Path:{' '}
              {bestIteration.path.map((vertice) => vertice.index).join(' -> ')}
              <br />
              Length: ~{bestIteration.length.toFixed(2)}
            </p>
          )}

          <div>
            <Button fullWidth onClick={() => dispatch(toggleShowIndexes())}>
              {showIndexes ? 'Hide' : 'Show'} indexes
            </Button>
          </div>
        </>
      )}

      <hr />
    </div>
  );
};
