import React, { useContext, useState } from 'react';
import styled from 'styled-components/macro';

import { REQUEST_TYPES } from '../../common/API';
import AccountContext from '../../common/contexts/AccountContext';
import TournamentContext from '../../common/contexts/TournamentContext';
import WebSocketContext from '../../common/contexts/WebSocketContext';
import ControlsButton from '../../common/ui/ControlsButton';

import TournamentKiller from './TournamentKiller';
import TournamentStarter from './TournamentStarter';

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
    <ControlsView hasEnded={tour.winner !== undefined}>
      {showStart && <TournamentStarter className="starter" setStarted={setHasStarted} />}
      {hasStarted && !showStart && !tour.winner && (
        <ControlsButton className="starter" onClick={hc}>
          Start next game!
        </ControlsButton>
      )}
      <TournamentKiller className="killer" />
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
  & > * {
    align-self: center;
    margin-bottom: 1em;
  }
  @media screen and (min-width: 1100px) {
    display: ${({ hasEnded }) => (hasEnded ? 'flex' : 'grid')};
    width: 100%;
    & > * {
      margin: 1em 4em 0em 4em;
      max-width: 18em;
    }
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr;
    .starter {
      grid-row: 1 / span 1;
      grid-column: 1 / span 1;
    }
    .killer {
      grid-row: 1 / span 1;
      grid-column: 2 / span 1;
    }
  }
`;
