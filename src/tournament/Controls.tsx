import React, { useContext, useState } from 'react';
import styled from 'styled-components/macro';

import TournamentContext from '../common/contexts/TournamentContext';

import TournamentKiller from './contr/TournamentKiller';
import TournamentStarter from './contr/TournamentStarter';

export default function Controls() {
  const tour = useContext(TournamentContext);
  const [started, setStarted] = useState(false);
  const showStart = !started && tour.gamePlan.players.length > 0;
  return (
    <ControlsView>
      {showStart && <TournamentStarter setStarted={setStarted} />}
      <TournamentKiller />
    </ControlsView>
  );
}

const PanelView = styled.div`
  display: flex;
  justify-content: space-around;
  flex-direction: row;
  & > * {
    align-self: flex-start;
  }
`;

const ControlsView = styled(PanelView)`
  justify-content: flex-start;
  & * {
    margin-left: 2em;
    margin-right: 2em;
  }
`;
