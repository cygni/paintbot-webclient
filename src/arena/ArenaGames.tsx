import React, { useContext } from 'react';
import styled from 'styled-components/macro';

import ArenaContext from '../common/contexts/ArenaContext';
import GameLink from '../game/GameLink';

import CurrentArenaGame from './CurrentArenaGame';

export default function ArenaGames(props: any) {
  const arenaContext = useContext(ArenaContext);

  return (
    <FlexColumn className={props.className}>
      <CurrentArenaGame />
      {arenaContext.gameHistory.length < 1 && <h2>No games played</h2>}
      {arenaContext.gameHistory.length > 0 && (
        <FlexColumn>
          <h2>Played games</h2>
          <ul>
            {arenaContext.gameHistory.reverse().map((arenaHistory, index) => {
              return (
                <li key={arenaHistory.gameId}>
                  <GameLink id={arenaHistory.gameId} />
                </li>
              );
            })}
          </ul>
        </FlexColumn>
      )}
    </FlexColumn>
  );
}

const FlexColumn = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  & * {
    align-self: center;
  }
`;
