import React, { useContext } from 'react';
import styled from 'styled-components/macro';

import AccountContext from '../../common/contexts/AccountContext';
import TournamentContext from '../../common/contexts/TournamentContext';
import Controls from '../Controls';
import GamePlan from '../viewer/GamePlan';
import Players from '../viewer/Players';
import Settings from '../viewer/Settings';

import TournamentPropertySetter from './propSetter/TournamentPropertySetter';

export default function TournamentController(props: any) {
  const tour = useContext(TournamentContext);
  const acc = useContext(AccountContext);
  const levels = tour.gamePlan.tournamentLevels;
  const showSetters = acc.loggedIn && (levels.length < 1 || levels[0].tournamentGames[0].gameId === null);

  return (
    <GridBox>
      <FlexColumn className="heading">
        <h1>{tour.tournamentName}</h1>
        {tour.winner && <h3>Winner: {tour.winner.name}</h3>}
        {acc.loggedIn && <Controls />}
      </FlexColumn>
      <Players className="players" />
      <GamePlan className="gameplan" />
      {showSetters && <TournamentPropertySetter className="settings" />}
      {!showSetters && <Settings className="settings" />}
    </GridBox>
  );
}

const GridBox = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(3, 18em);
  grid-template-rows: 12em auto;
  justify-items: center;
  & > .players {
    grid-row: 2 / span 1;
    grid-column: 1 / span 1;
  }
  & > .gameplan {
    grid-row: 2 / span 1;
    grid-column: 2 / span 1;
  }
  & > .settings {
    grid-row: 2 / span 1;
    grid-column: 3 / span 1;
  }
  & > * {
    align-self: start;
    justify-self: center;
  }
  & li {
    margin-bottom: 2em;
  }
  & * {
    text-align: center;
  }
`;

const FlexColumn = styled.div`
  grid-row: 1 / 1;
  grid-column: 1 / span 3;
  display: flex;
  justify-content: center;
  flex-direction: column;
  & * {
    align-self: center;
  }
`;
