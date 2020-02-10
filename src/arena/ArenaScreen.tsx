import React, { useContext } from 'react';
import styled from 'styled-components/macro';

import ArenaContext from '../common/contexts/ArenaContext';
import { Heading1 } from '../common/ui/Heading';

import ArenaForm from './ArenaForm';
import ArenaGames from './ArenaGames';
import ArenaStarter from './ArenaStarter';
import OnlinePlayers from './OnlinePlayers';

export default function ArenaScreen() {
  const arenaContext = useContext(ArenaContext);

  return (
    <>
      <Heading1>{arenaContext.arenaName}</Heading1>
      {arenaContext.onlinePlayers.length > 0 && <ArenaStarter />}
      <ArenaForm />
      <Papers>
        <PaperColumn>
          <ArenaGames />
        </PaperColumn>
        <PaperColumn>
          <OnlinePlayers />
        </PaperColumn>
      </Papers>
    </>
  );
}

const Papers = styled.div`
  display: flex;
  width: 100%;
  max-width: 800px;
  margin-top: 1rem;
  @media screen and (max-width: 800px) {
    flex-direction: column;
  }
`;

interface PaperColumnProps {
  flex?: number;
}

const PaperColumn = styled.div<PaperColumnProps>`
  flex: 1;
  display: flex;
  flex-direction: column;
  margin: 0 1rem;
  & > div {
    width: 100%;
  }
  @media screen and (max-width: 800px) {
    flex: none;
  }
`;
