import React, { useContext } from 'react';
import { Link } from 'react-router-dom';

import { REQUEST_TYPES } from '../common/API';
import ArenaContext from '../common/contexts/ArenaContext';
import WebSocketContext from '../common/contexts/WebSocketContext';
import GameLink from '../game/GameLink';
import PlayerLink from '../player/PlayerLink';

import ArenaForm from './ArenaForm';

export default function ArenaScreen() {
  const arenaContext = useContext(ArenaContext);

  return (
    <>
      <h1>{arenaContext.arenaName}</h1>
      <ArenaForm />
      <ArenaViewer />
    </>
  );
}

function ArenaViewer() {
  const arenaContext = useContext(ArenaContext);

  return (
    <>
      {arenaContext.onlinePlayers.length < 1 && <h2>No players online</h2>}
      {arenaContext.onlinePlayers.length > 0 && (
        <>
          <h2>Online players</h2>
          <ul>
            {arenaContext.onlinePlayers.map((player, index) => {
              return (
                <li key={player}>
                  <PlayerLink name={player} />
                </li>
              );
            })}
          </ul>
        </>
      )}
      <CurrentArenaGame />
      <ArenaGames />
    </>
  );
}

function ArenaStarter() {
  const send = useContext(WebSocketContext);
  const arena = useContext(ArenaContext);

  const startArena = (event: any) => {
    event.preventDefault();
    send({
      type: REQUEST_TYPES.START_ARENA_GAME,
      arenaName: arena.arenaName,
    });
  };

  return <button onClick={startArena}>Start new arena game</button>;
}

function CurrentArenaGame() {
  const arenaContext = useContext(ArenaContext);

  return (
    <>
      {arenaContext.gameId && (
        <h2>
          Latest game: {<Link to={`/game/${encodeURIComponent(arenaContext.gameId)}`}>{arenaContext.gameId}</Link>}
        </h2>
      )}
      <ArenaStarter />
    </>
  );
}

function ArenaGames() {
  const arenaContext = useContext(ArenaContext);

  return (
    <>
      {arenaContext.gameHistory.length < 1 && <h2>No games played</h2>}
      {arenaContext.gameHistory.length > 0 && (
        <>
          <h2>Played games</h2>
          <ul>
            {arenaContext.gameHistory.reverse().map((arenaHistory, index) => {
              return (
                <li key={arenaHistory.gameId}>
                  <GameLink id={arenaHistory.gameId} />
                </li>
              );
            })}
          </ul>
        </>
      )}
    </>
  );
}
