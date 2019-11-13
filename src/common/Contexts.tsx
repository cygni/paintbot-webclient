import React from 'react';

export const AccountContext = React.createContext({
  loggedIn: false,
  username: '',
  token: '',
});

export const defaultTournament = {
  gameSettings: {
    obstaclesEnabled: { value: true, type: 'boolean' },
    powerUpsEnabled: { value: true, type: 'boolean' },
    trainingGame: { value: true, type: 'boolean' },
    addPowerUpLikelihood: { value: 15, type: 'number', range: { min: 0, max: 100 } },
    removePowerUpLikelihood: { value: 5, type: 'number', range: { min: 0, max: 100 } },
    maxNoofPlayers: { value: 10, type: 'number', range: { min: 2, max: 20 } },
    startObstacles: { value: 5, type: 'number', range: { min: 0, max: null } },
    startPowerUps: { value: 0, type: 'number', range: { min: 0, max: null } },
    explosionRange: { value: 4, type: 'number', range: { min: 0, max: null } },
    gameDurationInSeconds: { value: 60, type: 'number', range: { min: 0, max: null } },
    noOfTicksInvulnerableAfterStun: { value: 3, type: 'number', range: { min: 0, max: null } },
    noOfTicksStunned: { value: 10, type: 'number', range: { min: 0, max: null } },
    pointsPerCausedStun: { value: 5, type: 'number', range: { min: 0, max: null } },
    pointsPerTileOwned: { value: 1, type: 'number', range: { min: 0, max: null } },
    timeInMsPerTick: { value: 4, type: 'number', range: { min: 0, max: null } },
  },
  tournamentId: '',
  tournamentName: '',
};

export const validateTour = (t: any) => {
  const newTourContext = JSON.parse(JSON.stringify(defaultTournament));
  const gs = t.gameSettings;
  for (const k in gs) {
    if (gs.hasOwnProperty(k)) {
      const oldVal = defaultTournament.gameSettings[k];
      const newVal = gs[k].value === undefined ? gs[k] : gs[k].value;
      if (oldVal === undefined || oldVal.type !== typeof newVal) {
        return defaultTournament;
      }
      newTourContext.gameSettings[k].value = newVal;
      newTourContext.gameSettings[k].type = oldVal.type;
    }
  }
  newTourContext.tournamentId = t.tournamentId;
  newTourContext.tournamentName = t.tournamentName;
  return newTourContext;
};

export const TournamentContext = React.createContext(defaultTournament);
