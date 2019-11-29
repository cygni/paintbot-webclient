import React, { useContext } from 'react';
import styled from 'styled-components/macro';

import TournamentContext from '../../common/contexts/TournamentContext';
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
    grid-template-rows: repeat(${players.length + 3}, 5em);
    grid-template-columns: 1fr;
    justify-items: center;
    & * {
      align-self: stretch;
      margin: 0px;
    }
  `;

  return (
    <GridBox className={className}>
      {players.length < 1 && <h3>No players online!</h3>}
      {players.length > 0 && (
        <GridRow no={1} length={players.length + 1}>
          <h3 className="first">Position</h3>
          <h3 className="second">Player</h3>
          <h3 className="third">Points</h3>
        </GridRow>
      )}
      {players.length > 0 &&
        players
          .sort((p1, p2) => p2.points - p1.points)
          .map((player, index) => (
            <GridRow no={index + 2} length={players.length + 1} key={`row${player.name}${index}`}>
              <h3 className="first">{index + 1}</h3>
              <div className="second">
                <PlayerLink name={player.name} />
              </div>
              <h3 className="third">{player.points}</h3>
            </GridRow>
          ))}
    </GridBox>
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
  ${props => props.no === 1 && 'padding-top: 1em;;'}
  ${props => props.no === 1 && 'border-radius: 10px 10px 0px 0px;'}
  ${props => props.no === props.length && 'border-radius: 0px 0px 10px 10px;'}
  & .first {
    align-self: stretch;
    grid-row: 1 / span 1;
    grid-column: 1 / span 1;
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
  }
`;
