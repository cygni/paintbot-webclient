import styled from 'styled-components/macro';

export const Paper = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  background-color: white;
  box-shadow: 0 0 4px rgba(0, 0, 0, 0.3);
  padding: 1em 0;
  margin-bottom: 1rem;
`;

export const PaperHeading = styled.h2`
  margin: 0px;
  font-family: 'Raleway', sans-serif;
  text-transform: uppercase;
  font-weight: 400;
  font-size: 14px;
  color: #e7beff;
  text-align: center;
`;

export const PaperRow = styled.div`
  box-sizing: border-box;
  border-bottom: 1px solid aliceblue;
  padding: 0.5rem 1rem 0;
  width: 100%;
  min-height: 38px;
`;

export const PaperHeadingRow = styled(PaperRow)`
  font-size: 24px;
  display: flex;
  justify-content: space-between;
`;
