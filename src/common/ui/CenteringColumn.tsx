import styled from 'styled-components/macro';

export const CenteringColumn = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  & * {
    align-self: center;
  }
`;
