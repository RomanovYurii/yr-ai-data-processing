import React, { useContext } from 'react';
import { StyledClickableText } from '../FloatingMenu.styled';
import { useToggle } from '@uidotdev/usehooks';
import { Button } from '@mui/joy';
import styled from 'styled-components';
import { AcoContext } from '@src/contexts';

const StyledControlButton = styled(Button)`
  &&&&&& {
    margin-bottom: 8px;
    width: 100%;
  }
`;

export const ControlsSection = () => {
  const { start, stop } = useContext(AcoContext);

  const [showControls, toggleShowControls] = useToggle(true);

  return (
    <div>
      <StyledClickableText onClick={() => toggleShowControls()}>
        Controls (click to show/hide)
      </StyledClickableText>

      {showControls && (
        <div>
          <StyledControlButton color="success" onClick={start}>
            Start
          </StyledControlButton>

          <StyledControlButton color="danger" onClick={stop}>
            Stop
          </StyledControlButton>
        </div>
      )}

      <hr />
    </div>
  );
};
