import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';

import { REQUEST_TYPES } from '../common/API';
import AccountContext from '../common/contexts/AccountContext';
import TournamentContext from '../common/contexts/TournamentContext';
import WebSocketContext from '../common/contexts/WebSocketContext';
import { Game, TournamentLevel } from '../common/types';

export default function TournamentViewer() {
  const [showProps, setShowProps] = useState(false);
  const tourContext = useContext(TournamentContext);
  const gamePlan = tourContext.gamePlan;
  const gameSettings = tourContext.gameSettings;
  const players = gamePlan.players;
  const levels: TournamentLevel[] = gamePlan.tournamentLevels;

  const oc = (event: any) => {
    event.preventDefault();
    setShowProps(!showProps);
  };

  return (
    <div id="current-tournament">
      <h1>{tourContext.tournamentName}</h1>
      <h2>Game plan</h2>
      <p>{`noofLevels: ${gamePlan.noofLevels}`}</p>
      <h3>Players: {players.length < 1 && 'None'}</h3>
      {players.length > 0 && (
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Points</th>
            </tr>
          </thead>
          <tbody>
            {players.length > 0 &&
              players
                .sort((p1, p2) => p2.points - p1.points)
                .map(player => {
                  return (
                    <tr key={player.id}>
                      <td>{player.name}</td>
                      <td>{player.points}</td>
                    </tr>
                  );
                })}
          </tbody>
        </table>
      )}
      <h3>Levels: {!Boolean(levels[0]) && 'None'}</h3>
      {Boolean(levels[0]) && levels[0].tournamentGames[0].gameId !== null && <GamesList gamePlan={gamePlan} />}
      {Boolean(levels[0]) && levels[0].tournamentGames[0].gameId === null && <p>Tournament is not planned yet.</p>}
      <h3>
        Winner:{' '}
        {tourContext.winner !== null && tourContext.winner !== undefined ? tourContext.winner.name : 'No winner yet'}
      </h3>
      <h2>Game settings</h2>
      <button onClick={oc}>{showProps ? 'Hide' : 'Show'} settings</button>
      {showProps && (
        <ul id="game-settings">
          {Object.keys(gameSettings).map(k => (
            <li key={k}>{`${k}: ${gameSettings[k]}`}</li>
          ))}
        </ul>
      )}
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
  const [clicked, setClicked] = useState(false);
  const accContext = useContext(AccountContext);
  const send = useContext(WebSocketContext);
  const game: Game = props.game;

  const hc = (event: any) => {
    event.preventDefault();
    setClicked(true);
    const gameMess = {
      token: accContext.token,
      gameId: game.gameId,
      type: REQUEST_TYPES.START_TOURNAMENT_GAME,
    };
    send(gameMess);
  };

  const players = game.players
    .map(value => {
      return `${value.name}`;
    })
    .reduce((prev, curr) => {
      return `${prev} ${curr}`;
    });

  const getWinner = (g: Game) => {
    const winner = g.players.find((player, index, obj) => {
      if (player.isWinner) {
        return true;
      }
      return false;
    });
    return winner ? winner.name : '';
  };

  return (
    <div>
      {game.gamePlayed && <Link to={`/game/${game.gameId}`}>Winner: {getWinner(game)}</Link>}
      {!game.gamePlayed && <p>{players}</p>}
      {accContext.loggedIn && !game.gamePlayed && !clicked && <button onClick={hc}>Start</button>}
      {accContext.loggedIn && !game.gamePlayed && clicked && <p>Waiting on game to finish...</p>}
    </div>
  );
}
