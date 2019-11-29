import React, { useContext } from 'react';
import styled from 'styled-components/macro';

import ArenaContext from '../common/contexts/ArenaContext';
import GameLink from '../game/GameLink';

import CurrentArenaGame from './CurrentArenaGame';

export default function ArenaGames(props: any) {
  const arenaContext = useContext(ArenaContext);
  return (
    <FlexColumn className={props.className}>
      {arenaContext.gameHistory.length < 1 && !arenaContext.gameId && <h2>No games played</h2>}
      {(arenaContext.gameHistory.length > 0 || arenaContext.gameId) && (
        <FlexColumn>
          <h2>Played games</h2>
          <ul>
            <CurrentArenaGame />
            {arenaContext.gameHistory.reverse().map((arenaHistory, index) => {
              return (
                <li key={arenaHistory.gameId}>
                  <GameLink id={arenaHistory.gameId}>Game number {arenaContext.gameHistory.length - index}</GameLink>
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
    align-self: stretch;
  }
  li {
    margin: 2em;
  }
  ul {
    margin: 0em 2em 0em 2em;
    padding: 1em;
    background-color: rgba(100%, 100%, 100%, 50%);
    border-radius: 10px;
  }
`;
