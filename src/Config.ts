const runLocally = false;

const domain = runLocally ? 'localhost:8080' : 'server.paintbot.cygni.se';
const httpProtocol = runLocally ? 'http' : 'https';
const websocketProtocol = runLocally ? 'ws' : 'wss';

const Config = {
  BackendUrl: `${httpProtocol}://${domain}`,
  LoginUrl: (acc: string, pass: string) => `${httpProtocol}://${domain}/login?login=${acc}&password=${pass}`,
  WebSocketApiUrl: `${websocketProtocol}://${domain}/events-native`,
  TimerSeconds: 20,
  GameSpeedMin: 50,
  GameSpeedMax: 600,
  DefaultGameSpeed: 300,
};

export default Config;
