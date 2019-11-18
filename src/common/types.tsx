export interface Player {
  id: string;
  isMovedUpInTournament: boolean;
  isWinner: boolean;
  name: string;
  points: number;
}

export interface Game {
  expectedNoofPlayers: number;
  gameId: string;
  gamePlayed: boolean;
  players: Player[];
}

export interface TournamentLevel {
  expectedNoofPlayers: number;
  level: number;
  players: Player[];
  tournamentGames: Game[];
}

export interface GamePlan {
  noofLevels: number;
  players: Player[];
  tournamentId: string;
  tournamentLevels: TournamentLevel[];
  tournamentName: string;
}

export interface GameSettings {
  obstaclesEnabled: boolean;
  powerUpsEnabled: boolean;
  trainingGame: boolean;
  addPowerUpLikelihood: number;
  removePowerUpLikelihood: number;
  maxNoofPlayers: number;
  startObstacles: number;
  startPowerUps: number;
  explosionRange: number;
  gameDurationInSeconds: number;
  noOfTicksInvulnerableAfterStun: number;
  noOfTicksStunned: number;
  pointsPerCausedStun: number;
  pointsPerTileOwned: number;
  timeInMsPerTick: number;
}

export interface Tournament {
  gamePlan: GamePlan;
  gameSettings: GameSettings;
  tournamentId: string;
  tournamentName: string;
  winner?: Player;
}

export interface ActiveGamePlayer extends Player {}

export interface ActiveGame {
  gameId: string;
  subscribing: boolean;
  gameFeature: GameSettings;
  players: ActiveGamePlayer[];
}

export interface ActiveGamesList {
  games: ActiveGame[];
}
