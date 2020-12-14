import React, { useContext } from 'react';

import TournamentContext from '../../common/contexts/TournamentContext';
import { Heading2 } from '../../common/ui/Heading';
import { PaperRow, PaperList, PaperListItem } from '../../common/ui/Paper';
import PlayerLink from '../../common/ui/PlayerLink';

export default function Players() {
  const tour = useContext(TournamentContext);
  const players = tour.gamePlan.players;

  return (
    <>
      <PaperRow>
        <Heading2>Players</Heading2>
      </PaperRow>
      {players.length < 1 && <PaperRow>No players online!</PaperRow>}
      {players.length > 0 && (
        <PaperList>
          {players
            // .sort((p1, p2) => p2.points - p1.points)
            .map(player => (
              <PaperListItem key={player.name}>
                <PlayerLink name={player.name} />
              </PaperListItem>
            ))}
        </PaperList>
      )}
    </>
  );
}
