import React, { useReducer } from 'react';

import { useWebSocket } from '../common/utils';
import Config from '../Config';

import { ApiMessage, GameMessage, GameSettings, Map, PlayerRank } from './types';

type GameEvent =
  | { type: 'open' }
  | { type: 'message'; message: ApiMessage | GameMessage }
  | { type: 'close'; code: number; reason: string; wasClean: boolean };

interface GameState {
  gameSettings?: GameSettings;
  width?: number;
  height?: number;
  map?: Map;
  playerRanks?: PlayerRank[];
  playerWinnerId?: string;
  playerWinnerName?: string;
}

type GamesState = Partial<Record<string, GameState>>;

const initialState: GamesState = {};

function eventReducer(state: GamesState, event: GameEvent): GamesState {
  switch (event.type) {
    case 'open':
      return initialState;

    case 'message': {
      switch (event.message.type) {
        case 'se.cygni.paintbot.api.event.GameStartingEvent': {
          const { gameId, gameSettings, width, height } = event.message;
          return {
            ...state,
            [gameId]: {
              ...state[gameId],
              gameSettings,
              width,
              height,
            },
          };
        }

        case 'se.cygni.paintbot.api.event.MapUpdateEvent': {
          const { gameId, map } = event.message;
          return {
            ...state,
            [gameId]: {
              ...state[gameId],
              map,
            },
          };
        }

        case 'se.cygni.paintbot.api.event.GameResultEvent': {
          const { gameId, playerRanks } = event.message;
          return {
            ...state,
            [gameId]: {
              ...state[gameId],
              playerRanks,
            },
          };
        }

        case 'se.cygni.paintbot.api.event.GameEndedEvent': {
          const { gameId, map, playerWinnerId, playerWinnerName } = event.message;
          return {
            ...state,
            [gameId]: {
              ...state[gameId],
              map,
              playerWinnerId,
              playerWinnerName,
            },
          };
        }
      }
    }

    default:
      return state;
  }
}

export interface GameDirectorProps {
  id: string;
}

const readyStateMap = {
  [WebSocket.CONNECTING]: 'CONNECTING',
  [WebSocket.OPEN]: 'OPEN',
  [WebSocket.CLOSING]: 'CLOSING',
  [WebSocket.CLOSED]: 'CLOSED',
};

export default function GameDirector({ id }: GameDirectorProps) {
  const [state, dispatch] = useReducer(eventReducer, initialState);

  const ws = useWebSocket<ApiMessage | GameMessage>(Config.WebSocketApiUrl, {
    onOpen() {
      console.info('WebSocket connection opened');
      dispatch({ type: 'open' });
    },
    onMessage(message) {
      if (message.type === 'se.cygni.paintbot.eventapi.response.ActiveGamesList') {
        ws.send({
          type: 'se.cygni.paintbot.eventapi.request.SetGameFilter',
          includedGameIds: message.games.map(game => game.gameId),
        });
      }

      // console.info('WebSocket message received', message);
      dispatch({ type: 'message', message });
    },
    onClose(code, reason, wasClean) {
      console.info('WebSocket connection closed', { code, reason, wasClean });
      dispatch({ type: 'close', code, reason, wasClean });
    },
  });

  return (
    <>
      <button onClick={ws.reconnect}>Reconnect</button>
      <pre>ReadyState: {readyStateMap[ws.readyState]}</pre>
      <span>{JSON.stringify(state)}</span>
    </>
  );
}
