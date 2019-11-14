import React, { useContext } from 'react';

import { TournamentContext } from '../common/Contexts';

import TournamentRefresher from './tournamentRefresher';

export default function TournamentViewer(props: any) {
  const tourContext = useContext(TournamentContext);

  return (
    <div id="current-tournament">
      <h1>{tourContext.tournamentName}</h1>
      <TournamentRefresher hc={props.hc} />
      <h2>{tourContext.winner === null ? 'No winner yet' : tourContext.winner}</h2>
      <h3>Game plan</h3>
      <ul id="game-plan">
        <li>{`noofLevels: ${tourContext.gamePlan.noofLevels}`}</li>
        <li>{`players: ${tourContext.gamePlan.players.length === 0 ? 'none' : tourContext.gamePlan.players}`}</li>
        <li>{`tournamentLevels: ${
          tourContext.gamePlan.tournamentLevels.length === 0 ? 'none' : tourContext.gamePlan.tournamentLevels
        }`}</li>
      </ul>
      <h3>Game settings</h3>
      <ul id="game-settings">
        {Object.keys(tourContext.gameSettings).map(k => (
          <li key={k}>{`${k}: ${tourContext.gameSettings[k].value}`}</li>
        ))}
      </ul>
    </div>
  );
}
