import React, { useContext } from 'react';
import styled from 'styled-components/macro';

import TournamentContext from '../../common/contexts/TournamentContext';
import { Paper, PaperHeading } from '../../common/ui/Paper';
import PlayerLink from '../../common/ui/PlayerLink';

interface PlayersProps {
  className: string;
}

export default function Players({ className }: PlayersProps) {
  const tour = useContext(TournamentContext);
  const players = tour.gamePlan.players;

  const GridBox = styled.div`
    display: grid;
    justify-content: center;
    grid-template-rows: repeat(${players.length + 1}, 3em);
    grid-template-columns: 1fr;
    justify-items: center;
    & * {
      align-self: stretch;
      margin: 0px;
    }
  `;

  return (
    <Paper className={className}>
      <GridBox>
        <GridRow no={1} length={players.length + 1}>
          <PaperHeading className="first">Position</PaperHeading>
          <PaperHeading className="second">Player</PaperHeading>
          <PaperHeading className="third">Points</PaperHeading>
        </GridRow>
        {players.length < 1 && <span>No players online!</span>}
        {players.length > 0 &&
          players
            .sort((p1, p2) => p2.points - p1.points)
            .map((player, index) => (
              <GridRow no={index + 2} length={players.length + 1} key={`row${player.name}${index}`}>
                <span className="first">{index + 1}</span>
                <div className="second">
                  <PlayerLink name={player.name} />
                </div>
                <span className="third">{player.points}</span>
              </GridRow>
            ))}
      </GridBox>
    </Paper>
  );
}

interface GridRowProps {
  no: number;
  length: number;
}

const GridRow = styled.div<GridRowProps>`
  width: 100%;
  grid-row: ${props => props.no} / span 1;
  grid-column: 1 / span 1;
  display: grid;
  grid-template-rows: 1fr;
  grid-template-columns: repeat(3, 1fr);
  background-color: rgba(100%, 100%, 100%, 50%);
  margin-left: 1em;
  margin-right: 1em;
  align-self: stretch;
  & .first {
    align-self: stretch;
    grid-row: 1 / span 1;
    grid-column: 1 / span 1;
    justify-self: start;
    padding: 0 1em;
  }
  & .second {
    align-self: stretch;
    grid-row: 1 / span 1;
    grid-column: 2 / span 1;
  }
  & .third {
    align-self: stretch;
    grid-row: 1 / span 1;
    grid-column: 3 / span 1;
    justify-self: end;
    padding: 0 1em;
  }
`;
