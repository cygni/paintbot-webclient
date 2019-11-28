import React, { useContext, useEffect, useState } from 'react';
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
  const started = levels.length > 0 && levels[0].tournamentGames[0].gameId !== null;
  const [nextGame, setNextGame] = useState({ lvl: 0, game: 0 });
  const showSetters = acc.loggedIn && !started;
  const [playedGames, setPlayedGames] = useState(new Array<string>());

  console.log(playedGames);
  console.log(tour);
  useEffect(
    () => {
      const result = new Array<string>();
      let game = 0;
      let level = 0;
      for (const lvl of tour.gamePlan.tournamentLevels) {
        for (const g of lvl.tournamentGames) {
          if (g.gamePlayed) {
            result.unshift(g.gameId);
            game = game + 1;
            if (game === tour.gamePlan.tournamentLevels[level].tournamentGames.length) {
              game = 0;
              level = level + 1;
            }
          }
        }
      }
      setPlayedGames(result);
      setNextGame({ lvl: level, game });
    },
    [tour],
  );

  return (
    <Container started={started}>
      <FlexColumn className="heading">
        <h1>{tour.tournamentName}</h1>
        {tour.winner && <h2>{tour.winner.name} has won the tournament!!!</h2>}
        {acc.loggedIn && <Controls started={started} game={nextGame.game} lvl={nextGame.lvl} />}
      </FlexColumn>
      {started && <GamePlan className="gameplan" lvl={nextGame.lvl} game={nextGame.game} playedGames={playedGames} />}
      <Players className="players" />
      {showSetters && <TournamentPropertySetter className="settings" />}
      {!showSetters && <Settings className="settings" />}
    </Container>
  );
}

interface ContainerProps {
  started: boolean;
}

const Container = styled.div<ContainerProps>`
  width: 100%;
  display: flex;
  flex-direction: column;
  & * {
    align-self: center;
  }
  & li {
    margin-bottom: 2em;
  }
  & * {
    text-align: center;
  }
  @media screen and (min-width: 800px) {
    display: grid;
    grid-template-columns: ${({ started }) => (started ? 'repeat(3, 18em)' : 'repeat(2, 18em)')};
    grid-template-rows: 12em auto;
    justify-items: center;
    & > .players {
      grid-row: 2 / span 1;
      grid-column: 1 / span 1;
    }
    & > .gameplan {
      ${({ started }) => !started && 'display: none;'}
      grid-row: 2 / span 1;
      grid-column: 2 / span 1;
    }
    & > .settings {
      grid-row: 2 / span 1;
      grid-column: ${({ started }) => (started ? '3' : '2')} / span 1;
    }
    & > * {
      align-self: start;
      justify-self: center;
    }
  }
`;

const FlexColumn = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  & * {
    align-self: center;
  }
  @media screen and (min-width: 800px) {
    grid-row: 1 / 1;
    grid-column: 1 / span 3;
  }
`;
