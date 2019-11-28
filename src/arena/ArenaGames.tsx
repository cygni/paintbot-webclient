import React, { useContext } from 'react';
import styled from 'styled-components/macro';

import ArenaContext from '../common/contexts/ArenaContext';
import ScrollableViewport from '../common/ui/ScrollableViewport';
import GameLink from '../game/GameLink';

import CurrentArenaGame from './CurrentArenaGame';

export default function ArenaGames(props: any) {
  const arenaContext = useContext(ArenaContext);

  return (
    <FlexColumn className={props.className}>
      {arenaContext.gameHistory.length < 1 && <h2>No games played</h2>}
      {arenaContext.gameHistory.length > 0 && (
        <FlexColumn>
          <h2>Played games</h2>
          <ul>
            <ScrollableViewport>
              <CurrentArenaGame />
              {arenaContext.gameHistory.reverse().map((arenaHistory, index) => {
                return (
                  <li key={arenaHistory.gameId}>
                    <GameLink id={arenaHistory.gameId}>Game number {arenaContext.gameHistory.length - index}</GameLink>
                  </li>
                );
              })}
            </ScrollableViewport>
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
  li {
    margin: 1em;
  }
`;
