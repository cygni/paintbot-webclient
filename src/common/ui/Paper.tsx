import styled from 'styled-components/macro';

interface PaperProps {
  width?: string;
}

export const Paper = styled.div<PaperProps>`
  display: flex;
  justify-content: center;
  flex-direction: column;
  background-color: white;
  box-shadow: 0 0 4px rgba(0, 0, 0, 0.3);
  padding: 1em 0;
  margin-bottom: 1rem;
  width: ${props => props.width};
`;

export const PaperTopic = styled.h2`
  margin: 0px;
  font-family: 'Nanum Gothic', sans-serif;
  text-transform: uppercase;
  font-size: 14px;
  color: #e7beff;
  text-align: center;
`;

interface PaperRowProps {
  textAlign?: string;
}

export const PaperRow = styled.div<PaperRowProps>`
  box-sizing: border-box;
  border-bottom: 1px solid aliceblue;
  padding: 0.5rem 1.5rem;
  width: 100%;
  min-height: 38px;
  text-align: ${props => props.textAlign};
`;

export const PaperHeadingRow = styled(PaperRow)`
  margin-top: 1em;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
