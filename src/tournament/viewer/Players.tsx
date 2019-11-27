import React, { useContext } from 'react';
import styled from 'styled-components/macro';

import TournamentContext from '../../common/contexts/TournamentContext';
import PlayerLink from '../../player/PlayerLink';

interface PlayersProps {
  className: string;
}

export default function Players({ className }: PlayersProps) {
  const tour = useContext(TournamentContext);
  const players = tour.gamePlan.players;

  const GridBox = styled.div`
    display: grid;
    justify-content: center;
    grid-template-rows: repeat(${players.length + 3}, 5em);
    grid-template-columns: 100%;
    justify-items: center;
    align-items: center;
    & * {
      margin: 0px;
    }
  `;

  return (
    <GridBox className={className}>
      <Head>
        <h2>Players</h2>
        {players.length < 1 && <h3>No players online!</h3>}
      </Head>
      {players.length > 0 && (
        <GridRow no={2}>
          <h3 className="first">Position</h3>
          <h3 className="second">Player</h3>
          <h3 className="third">Points</h3>
        </GridRow>
      )}
      {players.length > 0 &&
        players
          .sort((p1, p2) => p2.points - p1.points)
          .map((player, index) => (
            <GridRow no={index + 3} key={`row${player.name}${index}`}>
              <h3 className="first">{index + 1}</h3>
              <PlayerLink className="second" name={player.name} />
              <h3 className="third">{player.points}</h3>
            </GridRow>
          ))}
    </GridBox>
  );
}

const Head = styled.div`
  display: flex;
  flex-direction: column;
  grid-column: 1 / span 1;
  grid-row: 1 / span 1;
`;

interface GridRowProps {
  no: number;
}

const GridRow = styled.div<GridRowProps>`
  grid-row: ${props => props.no} / span 1;
  grid-column: 1 / span 1;
  display: grid;
  grid-template-rows: 100%;
  grid-template-columns: repeat(3, 6em);
  & .first {
    grid-row: 1 / span 1;
    grid-column: 1 / span 1;
  }
  & .second {
    grid-row: 1 / span 1;
    grid-column: 2 / span 1;
  }
  & .third {
    grid-row: 1 / span 1;
    grid-column: 3 / span 1;
  }
`;
