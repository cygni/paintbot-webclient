import React, { useContext } from 'react';
import styled from 'styled-components/macro';

import TournamentContext from '../../common/contexts/TournamentContext';
import { Paper, PaperRow, PaperTopic } from '../../common/ui/Paper';
import PlayerLink from '../../common/ui/PlayerLink';

export default function Players() {
  const tour = useContext(TournamentContext);
  const players = tour.gamePlan.players;

  return (
    <Paper>
      <PaperTopic>Players</PaperTopic>
      <Content>
        {players.length < 1 && <PaperRow>No players online!</PaperRow>}
        {players.length > 0 &&
          players
            // .sort((p1, p2) => p2.points - p1.points)
            .map((player, index) => (
              <PaperRow key={`row${player.name}${index}`}>
                <PlayerLink name={player.name} />
              </PaperRow>
            ))}
      </Content>
    </Paper>
  );
}

const Content = styled.div`
  margin: 1rem 0 0;
`;
