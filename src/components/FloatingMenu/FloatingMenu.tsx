import React from 'react';
import { StyledFloatingMenu } from './FloatingMenu.styled';
import {
  ConfigurationSection,
  ControlsSection,
  CoordinatesListSection,
  DataTableSection,
} from './partials';
import { useToggle } from '@uidotdev/usehooks';
import classNames from 'classnames';
import {
  SlArrowDown,
  SlArrowUp,
  SlSizeActual,
  SlSizeFullscreen,
} from 'react-icons/sl';
import { Button } from '@mui/joy';
import { useSelector } from '@src/store/hooks';

export const FloatingMenu = () => {
  const { vertices } = useSelector((state) => state.vertices);

  const [fullScreen, toggleFullScreen] = useToggle();
  const [minimized, toggleMinimized] = useToggle(false);

  return (
    <StyledFloatingMenu
      className={classNames({
        'full-screen': fullScreen,
        minimized: minimized,
      })}
    >
      {minimized ? (
        <Button
          color="neutral"
          variant="plain"
          onClick={() => toggleMinimized()}
        >
          <SlArrowUp />
        </Button>
      ) : (
        <>
          <h3>Selected points: {vertices.length}</h3>

          <div className="action-buttons">
            <Button
              color="neutral"
              variant="plain"
              onClick={() => toggleFullScreen()}
            >
              {fullScreen ? <SlSizeActual /> : <SlSizeFullscreen />}
            </Button>

            <Button
              color="neutral"
              variant="plain"
              onClick={() => {
                toggleMinimized();
                toggleFullScreen(false);
              }}
            >
              <SlArrowDown />
            </Button>
          </div>

          <ConfigurationSection />

          {vertices.length > 0 && <CoordinatesListSection />}

          {vertices.length > 3 && (
            <>
              <DataTableSection />

              <ControlsSection />
            </>
          )}
        </>
      )}
    </StyledFloatingMenu>
  );
};
