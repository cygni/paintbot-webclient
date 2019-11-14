import Config from '../Config';

export const RESPONSE_TYPES = {
  ACTIVE_GAMES_LIST: 'se.cygni.paintbot.eventapi.response.ActiveGamesList',
  TOURNAMENT_CREATED: 'se.cygni.paintbot.eventapi.response.TournamentCreated',
  TOURNAMENT_INFO: 'se.cygni.paintbot.eventapi.model.TournamentInfo',
  TOURNAMENT_GAME_PLAN: 'se.cygni.paintbot.eventapi.model.TournamentGamePlan',
  UNAUTHORIZED: 'se.cygni.paintbot.eventapi.exception.Unauthorized',
  API_MESSAGE_EXCEPTION: 'se.cygni.paintbot.eventapi.exception.ApiMessageException',
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
      cb(response, type);
      console.log(`CLOSING SOCKET: ${ws.url}`);
      ws.close();
    }
  };
  ws.onerror = e => {
    handleError(e);
  };
}

export function preProcessGameSettings(gameSettings: any) {
  const gs = {};
  for (const k of Object.keys(gameSettings)) {
    gs[k] = gameSettings[k].value;
  }
  return gs;
}
