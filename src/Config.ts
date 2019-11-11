const Config = {
  BackendUrl: 'http://localhost:8080',
  LoginUrl: (acc: string, pass: string) => `http://localhost:8080/login?login=${acc}&password=${pass}`,
  WebSocketApiUrl: 'ws://localhost:8080/events-native',
  TimerSeconds: 20,
  GameSpeedMin: 50,
  GameSpeedMax: 600,
  DefaultGameSpeed: 300,
};

export default Config;
