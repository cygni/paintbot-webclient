import React, { useContext } from 'react';
import styled from 'styled-components/macro';

import ArenaContext from '../common/contexts/ArenaContext';
import GameLink from '../game/GameLink';

export default function CurrentArenaGame() {
  const arenaContext = useContext(ArenaContext);

  return (
    <>
      {arenaContext.gameId && (
        <FlexColumn>
          <h2>Latest game</h2>
          <GameLink id={encodeURIComponent(arenaContext.gameId)} />
        </FlexColumn>
      )}
    </>
  );
}

const FlexColumn = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  & > h2 {
    align-self: center;
  }
`;
