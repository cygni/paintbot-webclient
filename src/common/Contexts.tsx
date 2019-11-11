import React from 'react';

export const AccountContext = React.createContext({
  loggedIn: false,
  username: '',
  token: '',
});

export const defaultTournament = {
  gameSettings: {
    addPowerUpLikelihood: 15,
    explosionRange: 4,
    gameDurationInSeconds: 60,
    maxNoofPlayers: 10,
    noOfTicksInvulnerableAfterStun: 3,
    noOfTicksStunned: 10,
    obstaclesEnabled: true,
    pointsPerCausedStun: 5,
    pointsPerTileOwned: 1,
    powerUpsEnabled: true,
    removePowerUpLikelihood: 5,
    startObstacles: 5,
    startPowerUps: 0,
    timeInMsPerTick: 250,
    trainingGame: true,
  },
  tournamentId: '',
  tournamentName: '',
};

export const TournamentContext = React.createContext(defaultTournament);
