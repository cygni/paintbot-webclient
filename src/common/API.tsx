import { useContext } from 'react';

import Config from '../Config';

import SettersContext from './contexts/SettersContext';
import TournamentContext, { defaultTournament } from './contexts/TournamentContext';

export const RESPONSE_TYPES = {
  ACTIVE_GAMES_LIST: 'se.cygni.paintbot.eventapi.response.ActiveGamesList',
  API_MESSAGE_EXCEPTION: 'se.cygni.paintbot.eventapi.exception.ApiMessageException',
  ARENA_UPDATE_EVENT: 'se.cygni.paintbot.api.event.ArenaUpdateEvent',
  TOURNAMENT_CREATED: 'se.cygni.paintbot.eventapi.response.TournamentCreated',
  TOURNAMENT_GAME_PLAN: 'se.cygni.paintbot.eventapi.model.TournamentGamePlan',
  TOURNAMENT_INFO: 'se.cygni.paintbot.eventapi.model.TournamentInfo',
  UNAUTHORIZED: 'se.cygni.paintbot.eventapi.exception.Unauthorized',
};

export const REQUEST_TYPES = {
  CREATE_TOURNAMENT: 'se.cygni.paintbot.eventapi.request.CreateTournament',
  GET_ACTIVE_TOURNAMENT: 'se.cygni.paintbot.eventapi.request.GetActiveTournament',
  KILL_TOURNAMENT: 'se.cygni.paintbot.eventapi.request.KillTournament',
  SET_CURRENT_ARENA: 'se.cygni.paintbot.eventapi.request.SetCurrentArena',
  SET_GAME_FILTER: 'se.cygni.paintbot.eventapi.request.SetGameFilter',
  START_ARENA_GAME: 'se.cygni.paintbot.eventapi.request.StartArenaGame',
  START_GAME: 'se.cygni.paintbot.eventapi.request.StartGame',
  START_TOURNAMENT: 'se.cygni.paintbot.eventapi.request.StartTournament',
  START_TOURNAMENT_GAME: 'se.cygni.paintbot.eventapi.request.StartTournamentGame',
  UPDATE_TOURNAMENT: 'se.cygni.paintbot.eventapi.request.UpdateTournamentSettings',
};

export default function sendPaintBotMessage(mess: any, responseType: string, cb: any, onError: any) {
  const ws = new WebSocket(Config.WebSocketApiUrl);

  const handleError = (e: any) => {
    console.log(e);
    onError(JSON.stringify(e));
    console.log(`CLOSING SOCKET: ${ws.url}`);
    ws.close();
  };

  ws.onopen = () => {
    console.log(`OPENING SOCKET: ${ws.url}`);
    ws.send(JSON.stringify(mess));
  };
  ws.onmessage = e => {
    const jsonResponse = JSON.parse(e.data);
    const { type, ...response } = jsonResponse;
    console.log(`MESSAGE RECEIVED FROM ${ws.url}`);
    console.log(jsonResponse);
    if (type === RESPONSE_TYPES.UNAUTHORIZED || type === RESPONSE_TYPES.API_MESSAGE_EXCEPTION) {
      handleError(e);
    } else if (type === responseType) {
      console.log(`CLOSING SOCKET: ${ws.url}`);
      ws.close();
      cb(response, type);
    }
  };
  ws.onerror = e => {
    handleError(e);
  };
}

export function useRestAPIToGetActiveTournament() {
  const setters = useContext(SettersContext);
  const tourContext = useContext(TournamentContext);
  return async () => {
    const response = await fetch(`${Config.BackendUrl}/tournament/active`);
    if (response.ok) {
      response.text().then(text => {
        const { type, ...tournament } = JSON.parse(text);
        setters.setTournament(tournament, tourContext, type);
        console.log(tournament);
      });
    } else {
      setters.setTournament(defaultTournament, tourContext, '');
    }
  };
}
