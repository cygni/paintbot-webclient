import React, { useContext } from 'react';
import styled from 'styled-components/macro';

import TournamentContext from '../../common/contexts/TournamentContext';

import TournamentKiller from './TournamentKiller';
import TournamentStarter from './TournamentStarter';

interface ControlsProps {
  started: boolean;
}

export default function Controls({ started }: ControlsProps) {
  const tour = useContext(TournamentContext);
  const showStart = !started && tour.gamePlan.players.length > 0;

  return (
    <ControlsView hasEnded={tour.winner !== undefined}>
      {showStart && <TournamentStarter />}
      <TournamentKiller />
    </ControlsView>
  );
}

interface ControlsViewProps {
  hasEnded: boolean;
}

const ControlsView = styled.div<ControlsViewProps>`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  align-items: center;
  & > * {
    margin-bottom: 1em;
  }
`;
