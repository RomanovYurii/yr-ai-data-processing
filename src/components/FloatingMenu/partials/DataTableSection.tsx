import React, { Fragment } from 'react';
import { StyledClickableText } from '@components/FloatingMenu/FloatingMenu.styled';
import { useToggle } from '@uidotdev/usehooks';
import styled from 'styled-components';
import { usePheromonesMatrix, useProximityMatrix } from '@src/hooks';

const StyledTableContainer = styled.div`
  overflow: auto;

  table,
  th,
  td {
    border: 1px solid black;
    border-collapse: collapse;
  }

  td {
    padding: 4px;
  }

  td:first-child[rowspan='2'] {
    display: none;
  }

  tbody tr:nth-last-child(1),
  tbody tr:nth-last-child(2) {
    display: none;
  }
`;

const CenteredTr = styled.tr`
  text-align: center;
`;

export const DataTableSection = () => {
  const [showTable, toggleShowTable] = useToggle(false);

  const { proximityMatrix } = useProximityMatrix();
  const { pheromonesMatrix } = usePheromonesMatrix();

  return (
    <div>
      <StyledClickableText onClick={() => toggleShowTable()}>
        Data table - Proximities and pheromones (click to show/hide)
      </StyledClickableText>

      {showTable && (
        <StyledTableContainer>
          <table>
            <thead>
              <CenteredTr>
                {proximityMatrix.map((_, i) => (
                  <td key={i}>{i}</td>
                ))}
              </CenteredTr>
            </thead>

            <tbody>
              {proximityMatrix.map((_, i) => (
                <Fragment key={i}>
                  <CenteredTr>
                    {_.map((_, j) => (
                      <td key={j}>{proximityMatrix[i][j]}</td>
                    ))}

                    <td
                      rowSpan={2}
                      style={{ verticalAlign: 'middle', minWidth: 32 }}
                    >
                      {i}
                    </td>
                  </CenteredTr>

                  <CenteredTr>
                    {_.map((_, j) => (
                      <td key={j}>{pheromonesMatrix[i][j]}</td>
                    ))}
                  </CenteredTr>
                </Fragment>
              ))}
            </tbody>
          </table>
        </StyledTableContainer>
      )}

      <hr />
    </div>
  );
};
