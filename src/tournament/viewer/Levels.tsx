import React, { useContext } from 'react';
import styled from 'styled-components/macro';

import TournamentContext from '../../common/contexts/TournamentContext';

import GamesList from './GamesList';

export default function Levels() {
  const tour = useContext(TournamentContext);
  const gamePlan = tour.gamePlan;
  const levels = gamePlan.tournamentLevels;

  return (
    <FlexColumn>
      {Boolean(levels[0]) && levels[0].tournamentGames[0].gameId !== null && <GamesList gamePlan={gamePlan} />}
      {Boolean(levels[0]) && levels[0].tournamentGames[0].gameId === null && <p>Tournament is not planned yet.</p>}
    </FlexColumn>
  );
}

const FlexColumn = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  & > h3 {
    align-self: center;
  }
  & * {
    align-self: flex-start;
  }
`;
