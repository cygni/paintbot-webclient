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
      <FlexColumn started={started} className="heading">
        <h1>{tour.tournamentName}</h1>
        {tour.winner && (
          <FlexRow>
            <PlayerLink name={tour.winner.name} />
            <h2>has won the tournament!!!</h2>
          </FlexRow>
        )}
        {acc.loggedIn && <Controls started={started} game={nextGame.game} lvl={nextGame.lvl} />}
      </FlexColumn>
      {started && <h2 className="gpheader">Game plan</h2>}
      {started && <GamePlan className="gameplan" lvl={nextGame.lvl} game={nextGame.game} playedGames={playedGames} />}
      <h2 className="pheader">Players</h2>
      <Players className="players" />
      <h2 className="sheader">Settings</h2>
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
  & h2 {
    margin-left: 0.5em;
  }
`;

const Container = styled.div<ContainerProps>`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  & li {
    margin-bottom: 2em;
  }
  & * {
    text-align: center;
  }
  @media screen and (min-width: 1000px) {
    display: grid;
    grid-template-columns: ${({ started }) => (started ? '18em 2em 18em 2em 18em' : '18em 2em 18em')};
    grid-template-rows: 18em 7em auto;
    justify-items: center;
    align-items: start;
    & > .pheader {
      grid-row: 2 / span 1;
      grid-column: 1 / span 1;
    }
    & > .gpheader {
      ${({ started }) => !started && 'display: none;'}
      grid-row: 2 / span 1;
      grid-column: 3 / span 1;
    }
    & > .sheader {
      grid-row: 2 / span 1;
      grid-column: ${({ started }) => (started ? '5' : '3')} / span 1;
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
    }
    & > .settings {
      grid-row: 3 / span 1;
      grid-column: ${({ started }) => (started ? '5' : '3')} / span 1;
      width: 100%;
      margin-left: 1em;
      margin-right: 1em;
      h2 {
        margin-top: 0px;
      }
    }
  }
`;

const FlexColumn = styled.div<ContainerProps>`
  display: flex;
  justify-content: center;
  flex-direction: column;
  @media screen and (min-width: 1000px) {
    grid-row: 1 / 1;
    grid-column: 1 / span ${({ started }) => (started ? '5' : '3')};
  }
`;
