import React, { useContext } from 'react';
import styled from 'styled-components/macro';

import TournamentContext from '../../common/contexts/TournamentContext';
import GameLink from '../../common/ui/GameLink';

interface GamePlanProps {
  className: string;
  lvl: number;
  game: number;
  playedGames: string[];
}

export default function GamePlan({ className, lvl, game, playedGames }: GamePlanProps) {
  const tour = useContext(TournamentContext);
  const levels = tour.gamePlan.tournamentLevels;
  const noRows = 3 + playedGames.length;
  const started = levels.length > 0 && levels[0].tournamentGames[0].gameId !== null;

  const GridBox = styled.div`
    width: 100%;
    display: grid;
    grid-template-rows: repeat(${noRows}, 6em);
    grid-template-columns: 1fr;
    & * {
      margin: 0px;
    }
  `;

  const gamesInCurrLvl = tour.winner ? 0 : tour.gamePlan.tournamentLevels[lvl].tournamentGames.length;
  const noLevels = tour.gamePlan.noofLevels;
  return (
    <GridBox className={className}>
      {!started && <h3>Tournament has not been started yet!</h3>}
      {started && (
        <Row no={1} length={playedGames.length + 1}>
          <h3>{tour.winner ? `Congratulations ${tour.winner.name}!` : 'The next game is'}</h3>
          {!tour.winner && (
            <h3>
              {lvl + 1 === noLevels
                ? 'The final!'
                : `Game ${game + 1} / ${gamesInCurrLvl} in Level ${lvl + 1} / ${noLevels}`}
            </h3>
          )}
        </Row>
      )}
      {started &&
        playedGames.map((gameId, index) => {
          let currLvl = 0;
          let currGame = playedGames.length - index;
          while (currGame > levels[currLvl].tournamentGames.length) {
            currGame = currGame - levels[currLvl].tournamentGames.length;
            currLvl = currLvl + 1;
          }
          currLvl = currLvl + 1;
          return (
            <Row no={index + 2} length={playedGames.length + 1} key={`gp-row${index}`}>
              <GameLink id={gameId}>
                {currLvl === noLevels ? 'Final' : `Game : ${currGame} / Level : ${currLvl}`}
              </GameLink>
            </Row>
          );
        })}
    </GridBox>
  );
}

interface RowProps {
  no: number;
  length: number;
}

const Row = styled.div<RowProps>`
  grid-column: 1 / span 1;
  grid-row: ${props => props.no} / span 1;
  margin-left: 1em;
  margin-right: 1em;
  align-self: stretch;
  justify-self: stretch;
  padding-left: 1em;
  padding-right: 1em;
  background-color: rgba(100%, 100%, 100%, 50%);
  ${props => props.no === 1 && 'padding-top: 1em;'}
  ${props => props.no === props.length && 'padding-bottom: 1em;'}
  ${props => props.no === 1 && 'border-radius: 10px 10px 0px 0px;'}
  ${props => props.no === props.length && 'border-radius: 0px 0px 10px 10px;'}
  ${props => props.no === props.length && props.no === 1 && 'border-radius: 10px;'}
`;
