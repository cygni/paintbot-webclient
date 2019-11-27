import React, { useContext } from 'react';
import styled from 'styled-components/macro';

import TournamentContext from '../../common/contexts/TournamentContext';
import GameLink from '../../game/GameLink';

interface GamePlanProps {
  className: string;
  lvl: number;
  game: number;
  playedGames: string[];
}

export default function GamePlan({ className, lvl, game, playedGames }: GamePlanProps) {
  const tour = useContext(TournamentContext);
  const levels = tour.gamePlan.tournamentLevels;
  const started = levels.length > 0 && levels[0].tournamentGames[0].gameId !== null;

  const GridBox = styled.div`
    display: grid;
    justify-content: center;
    grid-template-rows: repeat(${levels.length + 3}, 5em);
    grid-template-columns: 100%;
    justify-items: center;
    align-items: center;
    & * {
      margin: 0px;
    }
  `;

  return (
    <GridBox className={className}>
      <Row no={1}>
        <h2>Game plan</h2>
        {!started && <h3>Tournament has not been started yet!</h3>}
      </Row>
      {started && (
        <Row no={2}>
          <h3>
            {tour.winner ? `Congratulations ${tour.winner.name}!` : `Next game : Level ${lvl + 1} : Game ${game + 1}`}
          </h3>
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
            <Row no={index + 3} key={`gp-row${index}`}>
              {currLvl === tour.gamePlan.noofLevels ? (
                <h3>Final</h3>
              ) : (
                <h3>
                  Level : {currLvl} / Game : {currGame}
                </h3>
              )}
              <GameLink id={gameId} />
            </Row>
          );
        })}
    </GridBox>
  );
}

interface RowProps {
  no: number;
}

const Row = styled.div<RowProps>`
  display: flex;
  flex-direction: column;
  grid-column: 1 / span 1;
  grid-row: ${props => props.no} / span 1;
`;
