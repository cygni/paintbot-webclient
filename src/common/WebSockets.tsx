import Config from '../Config';

export const RESPONSE_TYPES = {
  TOURNAMENT_CREATED: 'se.cygni.paintbot.eventapi.response.TournamentCreated',
  TOURNAMENT_GAME_PLAN: 'se.cygni.paintbot.eventapi.model.TournamentGamePlan',
};

export const REQUEST_TYPES = {
  CREATE_TOURNAMENT: 'se.cygni.paintbot.eventapi.request.CreateTournament',
  UPDATE_TOURNAMENT: 'se.cygni.paintbot.eventapi.request.UpdateTournamentSettings',
  SET_CURRENT_ARENA: 'se.cygni.paintbot.eventapi.request.SetCurrentArena',
  SET_GAME_FILTER: 'se.cygni.paintbot.eventapi.request.SetGameFilter',
  START_TOURNAMENT_GAME: 'se.cygni.paintbot.eventapi.request.StartTournamentGame',
  START_TOURNAMENT: 'se.cygni.paintbot.eventapi.request.StartTournament',
  KILL_TOURNAMENT: 'se.cygni.paintbot.eventapi.request.KillTournament',
  GET_ACTIVE_TOURNAMENT: 'se.cygni.paintbot.eventapi.request.GetActiveTournament',
  START_ARENA_GAME: 'se.cygni.paintbot.eventapi.request.StartArenaGame',
  START_GAME: 'se.cygni.paintbot.eventapi.request.StartGame',
};

export default function sendPaintBotMessage(mess: any, responseType: string, cb: any, onError: any) {
  const ws = new WebSocket(Config.WebSocketApiUrl);

  ws.onopen = () => {
    console.log(`OPENING SOCKET: ${ws.url}`);
    ws.send(JSON.stringify(mess));
  };
  ws.onmessage = e => {
    const jsonResponse = JSON.parse(e.data);
    const { type, ...response } = jsonResponse;
    console.log(`MESSAGE RECEIVED FROM ${ws.url}`);
    console.log(jsonResponse);
    if (type === responseType) {
      cb(response);
      console.log(`CLOSING SOCKET: ${ws.url}`);
      ws.close();
    }
  };
  ws.onerror = e => {
    console.log(e);
    onError(JSON.stringify(e));
    console.log(`CLOSING SOCKET: ${ws.url}`);
    ws.close();
  };
}

export function preProcessGameSettings(gameSettings: any) {
  const gs = {};
  for (const k in gameSettings) {
    if (gameSettings.hasOwnProperty(k)) {
      gs[k] = gameSettings[k].value;
    }
  }
  return gs;
}
