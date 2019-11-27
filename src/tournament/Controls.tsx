import React, { useContext, useState } from 'react';
import styled from 'styled-components/macro';

import { REQUEST_TYPES } from '../common/API';
import AccountContext from '../common/contexts/AccountContext';
import TournamentContext from '../common/contexts/TournamentContext';
import WebSocketContext from '../common/contexts/WebSocketContext';
import ControlsButton from '../common/ui/ControlsButton';

import TournamentKiller from './contr/TournamentKiller';
import TournamentStarter from './contr/TournamentStarter';

interface ControlsProps {
  started: boolean;
  game: number;
  lvl: number;
}

export default function Controls({ started, game, lvl }: ControlsProps) {
  const tour = useContext(TournamentContext);
  const send = useContext(WebSocketContext);
  const acc = useContext(AccountContext);
  const [hasStarted, setHasStarted] = useState(started);
  const showStart = !started && tour.gamePlan.players.length > 0;

  const hc = (event: any) => {
    event.preventDefault();
    const l = lvl;
    const g = game;
    const currLvl = tour.gamePlan.tournamentLevels[l];
    const currGame = currLvl.tournamentGames[g];
    const gameMess = {
      token: acc.token,
      gameId: currGame.gameId,
      type: REQUEST_TYPES.START_TOURNAMENT_GAME,
    };
    send(gameMess);
  };

  return (
    <ControlsView>
      {showStart && <TournamentStarter setStarted={setHasStarted} />}
      {hasStarted && !tour.winner && <ControlsButton onClick={hc}>Start next game!</ControlsButton>}
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
