import React, { useContext } from 'react';
import { Link } from 'react-router-dom';

import sendPaintBotMessage, { REQUEST_TYPES, RESPONSE_TYPES, useRestAPIToGetActiveTournament } from '../common/API';
import AccountContext from '../common/contexts/AccountContext';
import SettersContext from '../common/contexts/SettersContext';
import TournamentContext from '../common/contexts/TournamentContext';
import { Game, GamePlan, TournamentLevel } from '../common/types';

export default function TournamentViewer() {
  const tourContext = useContext(TournamentContext);
  const gamePlan = tourContext.gamePlan;
  const gameSettings = tourContext.gameSettings;
  const players = gamePlan.players;
  const levels: TournamentLevel[] = gamePlan.tournamentLevels;

  return (
    <div id="current-tournament">
      <h1>{tourContext.tournamentName}</h1>
      <h2>Game plan</h2>
      <p>{`noofLevels: ${gamePlan.noofLevels}`}</p>
      <h3>Players: {players.length < 1 && 'None'}</h3>
      <ul id="players">
        {players.length > 0 &&
          players.map(player => {
            return <li key={player.id}>{player.name}</li>;
          })}
      </ul>
      <h3>Levels: {!Boolean(levels[0]) && 'None'}</h3>
      {Boolean(levels[0]) && levels[0].tournamentGames[0].gameId !== null && <GamesList gamePlan={gamePlan} />}
      {Boolean(levels[0]) && levels[0].tournamentGames[0].gameId === null && <p>Tournament is not planned yet.</p>}
      <h3>
        {' '}
        Winner: {tourContext.winner !== null && tourContext.winner !== undefined ? tourContext.winner.name : 'None'}
      </h3>
      <h2>Game settings</h2>
      <ul id="game-settings">
        {Object.keys(gameSettings).map(k => (
          <li key={k}>{`${k}: ${gameSettings[k]}`}</li>
        ))}
      </ul>
    </div>
  );
}

function GamesList(props: any) {
  const levels: TournamentLevel[] = props.gamePlan.tournamentLevels;
  return (
    <ol>
      {levels.map((level, levelIndex) => {
        return (
          <li key={`level${levelIndex}`}>
            <ul>
              {level.tournamentGames.map((game: Game, gameIndex) => {
                return (
                  <li key={`game${gameIndex}`}>
                    {game.players.length > 0 && <TournamentGameLink game={game} />}
                    {game.players.length < 1 && <p>Expecting {game.expectedNoofPlayers} players</p>}
                  </li>
                );
              })}
            </ul>
          </li>
        );
      })}
    </ol>
  );
}

function TournamentGameLink(props: any) {
  const accContext = useContext(AccountContext);
  const tourContext = useContext(TournamentContext);
  const setters = useContext(SettersContext);
  const getActiveTournament = useRestAPIToGetActiveTournament();
  const game: Game = props.game;

  const hc = (event: any) => {
    event.preventDefault();
    const cb = (response: GamePlan, type: string) => {
      setters.setTournament(response, tourContext, type);
      getActiveTournament();
    };
    const gameMess = {
      token: accContext.token,
      gameId: game.gameId,
      type: REQUEST_TYPES.START_TOURNAMENT_GAME,
    };
    sendPaintBotMessage(gameMess, RESPONSE_TYPES.TOURNAMENT_GAME_PLAN, cb, (e: any) => {
      console.log(e);
    });
  };

  const players = game.players
    .map(value => {
      return `${value.name}`;
    })
    .reduce((prev, curr) => {
      return `${prev} ${curr}`;
    });

  return (
    <div>
      {game.gamePlayed && <Link to={`/game/${game.gameId}`}>{players}</Link>}
      {!game.gamePlayed && <p>{players}</p>}
      {accContext.loggedIn && !game.gamePlayed && <button onClick={hc}>Start</button>}
    </div>
  );
}
