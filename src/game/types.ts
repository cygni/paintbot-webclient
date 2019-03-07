export interface GameMessageBase {
  type: GameMessageType;
  receivingPlayerId: string | null;
  timestamp: number;
}

export interface ArenaUpdateEvent extends GameMessageBase {
  type: 'se.cygni.paintbot.api.event.ArenaUpdateEvent';
  arenaName: string;
  gameId: string;
  ranked: boolean;
  rating: { [index: string]: number };
  onlinePlayers: string[];
  gameHistory: ArenaHistory[];
}

export interface ArenaHistory {
  gameId: string;
  playerPositions: string[];
}

export interface CharacterStunnedEvent extends GameMessageBase {
  type: 'se.cygni.paintbot.api.event.CharacterStunnedEvent';
  stunReason: StunReason;
  durationInTicks: number;
  playerId: string;
  x: number;
  y: number;
  gameId: string;
  gameTick: number;
}

export interface GameAbortedEvent extends GameMessageBase {
  type: 'se.cygni.paintbot.api.event.GameAbortedEvent';
  gameId: string;
}

export interface GameChangedEvent extends GameMessageBase {
  type: 'se.cygni.paintbot.api.event.GameChangedEvent';
  gameId: string;
}

export interface GameCreatedEvent extends GameMessageBase {
  type: 'se.cygni.paintbot.api.event.GameCreatedEvent';
  gameId: string;
}

export interface GameEndedEvent extends GameMessageBase {
  type: 'se.cygni.paintbot.api.event.GameEndedEvent';
  playerWinnerId: string;
  playerWinnerName: string;
  gameId: string;
  gameTick: number;
  map: Map;
}

export interface GameLinkEvent extends GameMessageBase {
  type: 'se.cygni.paintbot.api.event.GameLinkEvent';
  gameId: string;
  url: string;
}

export interface GameResultEvent extends GameMessageBase {
  type: 'se.cygni.paintbot.api.event.GameResultEvent';
  gameId: string;
  playerRanks: PlayerRank[];
}

export interface GameStartingEvent extends GameMessageBase {
  type: 'se.cygni.paintbot.api.event.GameStartingEvent';
  gameId: string;
  noofPlayers: number;
  width: number;
  height: number;
  gameSettings: GameSettings;
}

export interface MapUpdateEvent extends GameMessageBase {
  type: 'se.cygni.paintbot.api.event.MapUpdateEvent';
  gameTick: number;
  gameId: string;
  map: Map;
}

export interface TournamentEndedEvent extends GameMessageBase {
  type: 'se.cygni.paintbot.api.event.TournamentEndedEvent';
  playerWinnerId: string;
  gameId: string;
  gameResult: PlayerPoints[];
  tournamentName: string;
  tournamentId: string;
}

export interface InvalidMessage extends GameMessageBase {
  type: 'se.cygni.paintbot.api.exception.InvalidMessage';
  errorMessage: string;
  receivedMessage: string;
}

export interface InvalidPlayerName extends GameMessageBase {
  type: 'se.cygni.paintbot.api.exception.InvalidPlayerName';
  reasonCode: PlayerNameInvalidReason;
}

export interface NoActiveTournament extends GameMessageBase {
  type: 'se.cygni.paintbot.api.exception.NoActiveTournament';
}

export interface CharacterInfo {
  name: string;
  points: number;
  position: number;
  colouredPositions: number[];
  stunnedForGameTicks: number;
  id: string;
  carryingPowerUp: boolean;
}

export interface ColissionInfo {
  position: number;
  colliders: string[];
}

export interface ExplosionInfo {
  position: number;
  exploders: string[];
}

export interface GameSettings {
  maxNoofPlayers: number;
  timeInMsPerTick: number;
  obstaclesEnabled: boolean;
  powerUpsEnabled: boolean;
  addPowerUpLikelihood: number;
  removePowerUpLikelihood: number;
  trainingGame: boolean;
  pointsPerTileOwned: number;
  pointsPerCausedStun: number;
  noOfTicksInvulnerableAfterStun: number;
  noOfTicksStunned: number;
  startObstacles: number;
  startPowerUps: number;
  gameDurationInSeconds: number;
  explosionRange: number;
}

export interface Map {
  width: number;
  height: number;
  worldTick: number;
  characterInfos: CharacterInfo[];
  powerUpPositions: number[];
  obstaclePositions: number[];
  collisionInfos: ColissionInfo[];
  explosionInfos: ExplosionInfo[];
}

export interface MapCharacter {
  content: 'character';
  name: string;
  playerId: string;
}

export interface MapEmpty {
  content: 'empty';
}

export interface MapObstacle {
  content: 'obstacle';
}

export interface MapPaintbotBody {
  content: 'paintbotbody';
  tail: boolean;
  playerId: string;
  order: number;
}

export interface MapPowerUp {
  content: 'powerUp';
}

export type TileContent = MapCharacter | MapEmpty | MapObstacle | MapPaintbotBody | MapPowerUp;

export interface PlayerPoints {
  name: string;
  playerId: string;
  points: number;
}

export interface PlayerRank {
  playerName: string;
  playerId: string;
  rank: number;
  points: number;
  alive: boolean;
}

export interface ClientInfo extends GameMessageBase {
  type: 'se.cygni.paintbot.api.request.ClientInfo';
  language: string;
  languageVersion: string;
  operatingSystem: string;
  operatingSystemVersion: string;
  clientVersion: string;
}

export interface HeartBeatRequest extends GameMessageBase {
  type: 'se.cygni.paintbot.api.request.HeartBeatRequest';
}

export interface RegisterMove extends GameMessageBase {
  type: 'se.cygni.paintbot.api.request.RegisterMove';
  gameId: string;
  gameTick: number;
  direction: CharacterAction;
}

export interface RegisterPlayer extends GameMessageBase {
  type: 'se.cygni.paintbot.api.request.RegisterPlayer';
  playerName: string;
  gameSettings: GameSettings;
}

export interface StartGame2 extends GameMessageBase {
  type: 'se.cygni.paintbot.api.request.StartGame';
}

export interface HeartBeatResponse extends GameMessageBase {
  type: 'se.cygni.paintbot.api.response.HeartBeatResponse';
}

export interface PlayerRegistered extends GameMessageBase {
  type: 'se.cygni.paintbot.api.response.PlayerRegistered';
  gameId: string;
  name: string;
  gameSettings: GameSettings;
  gameMode: GameMode;
}

export type GameMessage =
  | ArenaUpdateEvent
  | CharacterStunnedEvent
  | GameAbortedEvent
  | GameChangedEvent
  | GameCreatedEvent
  | GameEndedEvent
  | GameLinkEvent
  | GameResultEvent
  | GameStartingEvent
  | MapUpdateEvent
  | TournamentEndedEvent
  | InvalidMessage
  | InvalidPlayerName
  | NoActiveTournament
  | ClientInfo
  | HeartBeatRequest
  | RegisterMove
  | RegisterPlayer
  | StartGame2
  | HeartBeatResponse
  | PlayerRegistered;

export type GameMessageType = GameMessage['type'];

export interface ApiMessageBase {
  type: ApiMessageType;
}

export interface Unauthorized extends ApiMessageBase {
  type: 'se.cygni.paintbot.eventapi.exception.Unauthorized';
  errorMessage: string;
}

export interface GameHistory extends ApiMessageBase {
  type: 'se.cygni.paintbot.eventapi.history.GameHistory';
  gameId: string;
  playerNames: string[];
  gameDate: Date;
  messages: GameMessageBase[];
}

export interface GameHistorySearchItem {
  gameId: string;
  players: string[];
  gameDate: Date;
}

export interface GameHistorySearchResult {
  items: GameHistorySearchItem[];
}

export interface ActiveGame {
  gameId: string;
  subscribing: boolean;
  players: ActiveGamePlayer[];
  gameFeatures: GameSettings;
}

export interface ActiveGamePlayer {
  name: string;
  id: string;
  points: number;
  isWinner: boolean;
  isMovedUpInTournament: boolean;
}

export interface TournamentGame {
  gameId: string;
  expectedNoofPlayers: number;
  players: ActiveGamePlayer[];
  gamePlayed: boolean;
}

export interface TournamentGamePlan extends ApiMessageBase {
  type: 'se.cygni.paintbot.eventapi.model.TournamentGamePlan';
  noofLevels: number;
  players: ActiveGamePlayer[];
  tournamentName: string;
  tournamentId: string;
  tournamentLevels: TournamentLevel[];
}

export interface TournamentInfo extends ApiMessageBase {
  type: 'se.cygni.paintbot.eventapi.model.TournamentInfo';
  tournamentId: string;
  tournamentName: string;
  gameSettings: GameSettings;
  gamePlan: TournamentGamePlan;
  winner: ActiveGamePlayer;
}

export interface TournamentLevel {
  level: number;
  expectedNoofPlayers: number;
  players: ActiveGamePlayer[];
  tournamentGames: TournamentGame[];
}

export interface CreateTournament extends ApiMessageBase {
  type: 'se.cygni.paintbot.eventapi.request.CreateTournament';
  token: string;
  tournamentName: string;
}

export interface GetActiveTournament extends ApiMessageBase {
  type: 'se.cygni.paintbot.eventapi.request.GetActiveTournament';
  token: string;
}

export interface KillTournament extends ApiMessageBase {
  type: 'se.cygni.paintbot.eventapi.request.KillTournament';
  token: string;
  tournamentId: string;
}

export interface ListActiveGames extends ApiMessageBase {
  type: 'se.cygni.paintbot.eventapi.request.ListActiveGames';
}

export interface SetCurrentArena extends ApiMessageBase {
  type: 'se.cygni.paintbot.eventapi.request.SetCurrentArena';
  currentArena: string;
}

export interface SetGameFilter extends ApiMessageBase {
  type: 'se.cygni.paintbot.eventapi.request.SetGameFilter';
  includedGameIds: string[];
}

export interface StartArenaGame extends ApiMessageBase {
  type: 'se.cygni.paintbot.eventapi.request.StartArenaGame';
  arenaName: string;
}

export interface StartGame extends ApiMessageBase {
  type: 'se.cygni.paintbot.eventapi.request.StartGame';
  gameId: string;
}

export interface StartTournament extends ApiMessageBase {
  type: 'se.cygni.paintbot.eventapi.request.StartTournament';
  token: string;
  tournamentId: string;
}

export interface StartTournamentGame extends ApiMessageBase {
  type: 'se.cygni.paintbot.eventapi.request.StartTournamentGame';
  token: string;
  gameId: string;
}

export interface UpdateTournamentSettings extends ApiMessageBase {
  type: 'se.cygni.paintbot.eventapi.request.UpdateTournamentSettings';
  token: string;
  gameSettings: GameSettings;
}

export interface ActiveGamesList extends ApiMessageBase {
  type: 'se.cygni.paintbot.eventapi.response.ActiveGamesList';
  games: ActiveGame[];
}

export interface NoActiveTournamentEvent extends ApiMessageBase {
  type: 'se.cygni.paintbot.eventapi.response.NoActiveTournamentEvent';
}

export interface TournamentCreated extends ApiMessageBase {
  type: 'se.cygni.paintbot.eventapi.response.TournamentCreated';
  tournamentId: string;
  tournamentName: string;
  gameSettings: GameSettings;
}

export interface TournamentPlayerList extends ApiMessageBase {
  type: 'se.cygni.paintbot.eventapi.response.TournamentPlayerList';
}

export type ApiMessage =
  | Unauthorized
  | GameHistory
  | TournamentGamePlan
  | TournamentInfo
  | CreateTournament
  | GetActiveTournament
  | KillTournament
  | ListActiveGames
  | SetCurrentArena
  | SetGameFilter
  | StartArenaGame
  | StartGame
  | StartTournament
  | StartTournamentGame
  | UpdateTournamentSettings
  | ActiveGamesList
  | NoActiveTournamentEvent
  | TournamentCreated
  | TournamentPlayerList;

export type ApiMessageType = ApiMessage['type'];

export type PlayerNameInvalidReason = 'Taken' | 'Empty' | 'InvalidCharacter';

export type CharacterAction = 'LEFT' | 'RIGHT' | 'UP' | 'DOWN' | 'STAY' | 'EXPLODE';

export type GameMode = 'TRAINING' | 'TOURNAMENT' | 'HIGHSCORE' | 'ARENA';

export type PointReason =
  | 'FOOD'
  | 'GROWTH'
  | 'NIBBLE'
  | 'CAUSED_SNAKE_DEATH'
  | 'LAST_SNAKE_ALIVE'
  | 'SUICIDE'
  | 'OWNED_TILES';

export type StunReason =
  | 'CollisionWithWall'
  | 'CollisionWithObstacle'
  | 'CollisionWithCharacter'
  | 'CaughtByPowerUpExplosion';

export type WorldSize = 'SMALL' | 'MEDIUM' | 'LARGE' | 'XLARGE';
