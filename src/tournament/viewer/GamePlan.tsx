import React from 'react';
import styled from 'styled-components/macro';

import Levels from './Levels';

export default function GamePlan({ className }: { className: string }) {
  return (
    <FlexColumn className={className}>
      <h2>Game plan</h2>
      <Levels />
    </FlexColumn>
  );
}

const FlexColumn = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
`;
