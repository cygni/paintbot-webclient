const domain = 'localhost';
const port = '8080';

const Config = {
  BackendUrl: `http://${domain}:${port}`,
  LoginUrl: (acc: string, pass: string) => `http://${domain}:${port}/login?login=${acc}&password=${pass}`,
  WebSocketApiUrl: `ws://${domain}:${port}/events-native`,
  TimerSeconds: 20,
  GameSpeedMin: 50,
  GameSpeedMax: 600,
  DefaultGameSpeed: 300,
};

export default Config;
