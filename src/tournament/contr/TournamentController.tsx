import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components/macro';

import AccountContext from '../../common/contexts/AccountContext';
import TournamentContext from '../../common/contexts/TournamentContext';
import PlayerLink from '../../common/ui/PlayerLink';

import Controls from './Controls';
import GamePlan from './GamePlan';
import Players from './Players';
import TournamentPropertySetter from './propSetter/TournamentPropertySetter';
import Settings from './Settings';

export default function TournamentController(props: any) {
  const tour = useContext(TournamentContext);
  const acc = useContext(AccountContext);
  const levels = tour.gamePlan.tournamentLevels;
  const started = levels.length > 0 && levels[0].tournamentGames[0].gameId !== null;
  const [nextGame, setNextGame] = useState({ lvl: 0, game: 0 });
  const showSetters = acc.loggedIn && !started;
  const [playedGames, setPlayedGames] = useState(new Array<string>());

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
      <h1 className="tournament-name">{tour.tournamentName}</h1>
      <FlexColumn started={started} className="boes">
        {tour.winner && (
          <FlexRow>
            <PlayerLink name={tour.winner.name} />
            <span>has won the tournament!!!</span>
          </FlexRow>
        )}
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

const FlexRow = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const Container = styled.div<ContainerProps>`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  & * {
    text-align: center;
  }
  & > .players,
  & > .gameplan,
  & > .settings {
    margin-bottom: 2rem;
  }
  @media screen and (min-width: 1100px) {
    display: grid;
    grid-template-columns: ${({ started }) => (started ? '18em 2em 18em 2em 18em' : '18em 2em 18em')};
    grid-template-rows: 4em 13em auto;
    justify-items: center;
    align-items: start;
    & > .tournament-name {
      grid-row: 1 / span 1;
      grid-column: 1 / span 5;
      width: 100%;
      margin-left: 1em;
      margin-right: 1em;
    }
    & > .boes {
      grid-row: 2 / span 1;
      grid-column: 1 / span 5;
      width: 100%;
      margin-left: 1em;
      margin-right: 1em;
    }
    & > .players {
      grid-row: 3 / span 1;
      grid-column: 1 / span 1;
      width: 100%;
      margin-left: 1em;
      margin-right: 1em;
    }
    & > .gameplan {
      ${({ started }) => !started && 'display: none;'}
      grid-row: 3 / span 1;
      grid-column: 3 / span 1;
      width: 100%;
    }
    & > .settings {
      grid-row: 3 / span 1;
      grid-column: ${({ started }) => (started ? '5' : '3')} / span 1;
      width: 100%;
      margin-left: 1em;
      margin-right: 1em;
    }
  }
`;

const FlexColumn = styled.div<ContainerProps>`
  display: flex;
  justify-content: center;
  flex-direction: column;
  @media screen and (min-width: 1100px) {
    grid-row: 1 / 1;
    grid-column: 1 / span ${({ started }) => (started ? '5' : '3')};
  }
`;
