import styled from 'styled-components/macro';

export const CenteringRow = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: row;
  & * {
    align-self: center;
  }
`;
