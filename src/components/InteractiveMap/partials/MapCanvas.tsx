import React from 'react';
import styled from 'styled-components';

const StyledCanvas = styled.canvas`
  position: absolute;
  top: 0;
  left: 0;
  user-select: none;
  z-index: 2;
`;

export const MapCanvas = () => <StyledCanvas id="mapCanvas" />;
