import React, { useContext } from 'react';
import styled from 'styled-components/macro';

import ArenaContext from '../common/contexts/ArenaContext';

import ArenaForm from './ArenaForm';
import ArenaGames from './ArenaGames';
import ArenaStarter from './ArenaStarter';
import OnlinePlayers from './OnlinePLayers';

export default function ArenaScreen() {
  const arenaContext = useContext(ArenaContext);

  return (
    <GridBox>
      <FlexColumn>
        <h1>{arenaContext.arenaName}</h1>
        <ArenaForm />
        {arenaContext.onlinePlayers.length > 0 && <ArenaStarter />}
      </FlexColumn>
      <OnlinePlayers className="players" />
      <ArenaGames className="games" />
    </GridBox>
  );
}

const GridBox = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 50% 50%;
  grid-template-rows: 12em auto;
  justify-items: center;
  & > .players {
    grid-row: 2 / span 1;
    grid-column: 1 / span 1;
  }
  & > .games {
    grid-row: 2 / span 1;
    grid-column: 2 / span 1;
  }
  & > * {
    align-self: start;
  }
  & li {
    margin-bottom: 2em;
  }
`;

const FlexColumn = styled.div`
  grid-row: 1 / 1;
  grid-column: 1 / 3;
  padding: 1em;
  display: flex;
  justify-content: center;
  flex-direction: column;
  & * {
    margin-bottom: 1em;
    align-self: center;
  }
`;
