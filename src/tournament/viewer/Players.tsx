import React, { useContext } from 'react';
import styled from 'styled-components/macro';

import TournamentContext from '../../common/contexts/TournamentContext';
import PlayerLink from '../../player/PlayerLink';

export default function Players({ className }: { className: string }) {
  const tour = useContext(TournamentContext);
  const players = tour.gamePlan.players;
  return (
    <FlexColumn className={className}>
      <h2>Players</h2>
      {players.length > 0 && (
        <FlexColumn>
          {players.length > 0 &&
            players
              .sort((p1, p2) => p2.points - p1.points)
              .map(player => {
                return (
                  <li key={player.name}>
                    <PlayerLink name={player.name} />
                  </li>
                );
              })}
        </FlexColumn>
      )}
    </FlexColumn>
  );
}

const FlexColumn = styled.ol`
  display: flex;
  justify-content: center;
  flex-direction: column;
  & > h3 {
    align-self: center;
  }
  & li {
    list-style-type: decimal;
    align-self: center;
    margin-bottom: 1em;
  }
`;
