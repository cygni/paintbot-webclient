import React, { useContext } from 'react';

import ArenaContext from '../common/contexts/ArenaContext';
import GameLink from '../common/ui/GameLink';

export default function CurrentArenaGame() {
  const arenaContext = useContext(ArenaContext);

  return (
    <>
      {arenaContext.gameId && (
        <li>
          <GameLink id={encodeURIComponent(arenaContext.gameId)}>
            Game number {arenaContext.gameHistory.length + 1}
          </GameLink>
        </li>
      )}
    </>
  );
}
