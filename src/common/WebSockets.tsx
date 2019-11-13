import Config from '../Config';

export const RESPONSE_TYPES = {
  TOURNAMENT_CREATED: 'se.cygni.paintbot.eventapi.response.TournamentCreated',
  TOURNAMENT_GAME_PLAN: 'se.cygni.paintbot.eventapi.model.TournamentGamePlan',
};

export const REQUEST_TYPES = {
  CREATE_TOURNAMENT: 'se.cygni.paintbot.eventapi.request.CreateTournament',
  UPDATE_TOURNAMENT: 'se.cygni.paintbot.eventapi.request.UpdateTournamentSettings',
};

export default function sendPaintBotMessage(mess: any, responseType: string, cb: any, onError: any) {
  const ws = new WebSocket(Config.WebSocketApiUrl);

  ws.onopen = () => {
    ws.send(JSON.stringify(mess));
  };
  ws.onmessage = e => {
    const jsonResponse = JSON.parse(e.data);
    const { type, ...response } = jsonResponse;
    console.log(jsonResponse);
    if (type === responseType) {
      cb(response);
      console.log('CLOSING SOCKET');
      ws.close();
    }
  };
  ws.onerror = e => {
    console.log(e);
    onError(JSON.stringify(e));
    console.log('CLOSING SOCKET');
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
