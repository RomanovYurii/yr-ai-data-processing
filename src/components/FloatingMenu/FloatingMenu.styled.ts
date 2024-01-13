import styled from 'styled-components';

export const StyledFloatingMenu = styled.div`
  position: fixed;
  top: 10px;
  right: 10px;
  max-height: calc(100vh - 40px);
  max-width: 20vw;
  box-sizing: border-box;
  background-color: white;
  z-index: 4;
  padding: 16px;
  padding-top: 24px;
  border-radius: 16px;
  user-select: none;
  border: 1px #cccccc solid;
  overflow: auto;

  &.full-screen {
    max-width: unset;
    max-height: unset;
    width: calc(100% - 32px - 20px);
    height: calc(100% - 32px - 30px);
    box-sizing: content-box;
    overflow: auto;
  }

  &.minimized {
    padding: 2px;
    border-radius: 6px;
  }

  .action-buttons {
    position: absolute;
    top: 8px;
    right: 8px;
    display: flex;
    justify-content: space-between;
  }
`;

export const StyledClickableText = styled.p`
  &:hover {
    cursor: pointer;
    text-decoration: underline;
  }
`;
