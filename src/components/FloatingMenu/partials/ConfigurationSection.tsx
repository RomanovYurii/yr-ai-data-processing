import React from 'react';
import styled from 'styled-components';
import { StyledClickableText } from '@components/FloatingMenu/FloatingMenu.styled';
import { useToggle } from '@uidotdev/usehooks';
import Button from '@mui/joy/Button';
import { useDispatch, useSelector } from '@src/store/hooks';
import {
  setAlpha,
  setAttractivenessScore,
  setBasePheromone,
  setBeta,
  setEvaporationRate,
  setNumOfAnts,
  setPheromoneCoefficient,
} from '@store/config';
import { SlInfo } from 'react-icons/sl';
import { useProximityMatrix } from '@src/hooks';

const StyledLabel = styled.label`
  display: inline-block;
  min-width: 48px;
  padding-right: 12px;
`;

const StyledInput = styled.input`
  width: 54px;
`;

export const ConfigurationSection = () => {
  const dispatch = useDispatch();

  const {
    alpha,
    attractivenessScore,
    basePheromone,
    beta,
    pheromoneCoefficient,
    numOfAnts,
    evaporationRate,
  } = useSelector((state) => state.config);
  const { vertices } = useSelector((state) => state.vertices);

  const [showConfig, toggleShowConfig] = useToggle(false);
  const { suggestedAttractivenessScore } = useProximityMatrix();

  return (
    <div>
      <StyledClickableText onClick={() => toggleShowConfig()}>
        Configuration (click to show/hide)
      </StyledClickableText>

      {showConfig && (
        <>
          <div>
            <StyledLabel>Alpha: </StyledLabel>
            <StyledInput
              type="number"
              value={alpha}
              onChange={(e) => dispatch(setAlpha(+e.target.value))}
            />
          </div>

          <div>
            <StyledLabel>Beta: </StyledLabel>
            <StyledInput
              type="number"
              value={beta}
              onChange={(e) => dispatch(setBeta(+e.target.value))}
            />
          </div>

          <div>
            <StyledLabel>Attractiveness score: </StyledLabel>
            <StyledInput
              type="number"
              value={attractivenessScore}
              onChange={(e) =>
                dispatch(setAttractivenessScore(+e.target.value))
              }
            />

            {suggestedAttractivenessScore > 0 &&
              suggestedAttractivenessScore !== attractivenessScore && (
                <Button
                  fullWidth
                  color="neutral"
                  size="sm"
                  variant="soft"
                  onClick={() =>
                    dispatch(
                      setAttractivenessScore(suggestedAttractivenessScore)
                    )
                  }
                >
                  Set suggested attr. score ({suggestedAttractivenessScore})
                </Button>
              )}
          </div>

          <div>
            <StyledLabel>Base pheromone: </StyledLabel>
            <StyledInput
              type="number"
              value={basePheromone}
              onChange={(e) => dispatch(setBasePheromone(+e.target.value))}
            />
          </div>

          <div>
            <StyledLabel>Pheromone coefficient: </StyledLabel>
            <StyledInput
              type="number"
              value={pheromoneCoefficient}
              onChange={(e) =>
                dispatch(setPheromoneCoefficient(+e.target.value))
              }
            />
            <br />
            <div style={{ display: 'flex' }}>
              <SlInfo />
              <small>Value of Q</small>
            </div>
          </div>

          <div>
            <StyledLabel>Evaporation rate: </StyledLabel>
            <StyledInput
              type="number"
              value={evaporationRate}
              onChange={(e) => dispatch(setEvaporationRate(+e.target.value))}
            />
            <br />
            <div style={{ display: 'flex' }}>
              <SlInfo />
              <small>Percent of pheromone that will evaporate</small>
            </div>
          </div>

          <div style={{ marginBottom: 4 }}>
            <StyledLabel>Number of ants: </StyledLabel>

            <StyledInput
              type="number"
              value={numOfAnts}
              onChange={(e) => dispatch(setNumOfAnts(+e.target.value))}
            />

            {vertices.length > 0 && numOfAnts !== vertices.length && (
              <Button
                color="neutral"
                disabled={false}
                onClick={() => dispatch(setNumOfAnts(vertices.length))}
                size="sm"
                variant="soft"
                style={{ width: '100%' }}
              >
                Set ants number to vertices amount ({vertices.length})
              </Button>
            )}
          </div>
        </>
      )}

      <hr />
    </div>
  );
};
