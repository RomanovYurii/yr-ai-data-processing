import React from 'react';
import styled from 'styled-components';

import { MapCanvas } from './partials';
import { POINTS } from './InteractiveMap.consts';
import { CitySelectionPoint } from '@src/components';
import { useMapCanvas } from '@src/hooks';

const MapContainer = styled.div`
  position: relative;
  overflow: auto;
  width: fit-content;
`;

const MapImage = styled.img`
  user-select: none;
  z-index: 1;
`;

export const InteractiveMap = () => {
  const { canvasWidth } = useMapCanvas();

  return (
    <MapContainer>
      <MapImage src="./map.jpg" />

      <MapCanvas />

      {canvasWidth !== 0 &&
        POINTS.map((point, index) => (
          <CitySelectionPoint key={index} left={point.x} top={point.y} />
        ))}
    </MapContainer>
  );
};
