const domain = 'server.paintbot.cygni.se'; // 'localhost';
// const port = 80; // '8080';

const Config = {
  BackendUrl: `https://${domain}`,
  LoginUrl: (acc: string, pass: string) => `https://${domain}/login?login=${acc}&password=${pass}`,
  WebSocketApiUrl: `wss://${domain}/events-native`,
  TimerSeconds: 20,
  GameSpeedMin: 50,
  GameSpeedMax: 600,
  DefaultGameSpeed: 300,
};

export default Config;
