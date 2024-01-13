import React, { useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import classNames from 'classnames';
import { useDispatch, useSelector } from '@src/store/hooks';
import { updateVertices } from '@src/store/vertices';

const POINT_WIDTH_PERCENT = 0.9;
const POINT_HEIGHT_PERCENT = 0.6;

const StyledCitySelectionPoint = styled.div<{ left: number; top: number }>`
  opacity: 1;
  width: ${POINT_WIDTH_PERCENT}%;
  height: ${POINT_HEIGHT_PERCENT}%;
  border-radius: 50%;
  background-color: #ffd500;
  box-sizing: border-box;
  border: 0.2vh solid black;
  position: absolute;
  left: ${(props) => props.left}%;
  top: ${(props) => props.top}%;
  z-index: 3;

  &:hover {
    cursor: pointer;
    border: 0.3vh solid black;
  }

  &.active {
    background-color: #00a1ff;
    border: 0.3vh solid black;
  }

  &.active > div {
    display: block;
  }
`;

const StyledIndexNumber = styled.div`
  display: none;
  position: absolute;
  bottom: 150%;
  font-weight: bold;
  background-color: white;
  padding: 0 4px;
  left: -30%;
`;

export const CitySelectionPoint = (props: { left: number; top: number }) => {
  const { left, top } = props;

  const dispatch = useDispatch();
  const { vertices, showIndexes } = useSelector((state) => state.vertices);

  const [isActive, setIsActive] = useState(false);
  const [coordinates, setCoordinates] = useState({
    x: 0,
    y: 0,
  });

  const index = useMemo(
    () => (isActive ? vertices.findIndex((v) => v === coordinates) : -1),
    [isActive, coordinates, vertices]
  );

  useEffect(() => {
    const canvas: HTMLCanvasElement = document.querySelector(
      '#mapCanvas'
    ) as HTMLCanvasElement;

    setCoordinates({
      x:
        (canvas.width / 100) * left +
        (canvas.width / 100) * (POINT_WIDTH_PERCENT / 2),
      y:
        (canvas.height / 100) * top +
        (canvas.height / 100) * (POINT_HEIGHT_PERCENT / 2),
    });
  }, [left, top]);

  const onClick = () => {
    let _vertices = [...vertices];

    if (!isActive) {
      _vertices.push(coordinates);
      dispatch(updateVertices(_vertices));
    } else {
      _vertices = _vertices.filter((v) => v !== coordinates);
      dispatch(updateVertices(_vertices));
    }

    setIsActive(!isActive);
  };

  return (
    <StyledCitySelectionPoint
      {...props}
      className={classNames('selection-point', { active: isActive })}
      onClick={onClick}
    >
      {showIndexes && <StyledIndexNumber>{index}</StyledIndexNumber>}
    </StyledCitySelectionPoint>
  );
};
