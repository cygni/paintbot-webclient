import React from 'react';

import { REQUEST_TYPES, RESPONSE_TYPES } from './API';

export const AccountContext = React.createContext({
  loggedIn: false,
  username: '',
  token: '',
});

export const defaultTournament = {
  gamePlan: {
    noofLevels: 0,
    players: [],
    tournamentId: '',
    tournamentLevels: [],
    tournamentName: '',
  },
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
  winner: null,
};

export const dummyTournament = {
  gamePlan: {
    noofLevels: 0,
    players: ['alice, bob'],
    tournamentId: '123',
    tournamentLevels: [],
    tournamentName: 'dummy',
  },
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
  tournamentId: '123',
  tournamentName: 'dummy',
  winner: null,
};

export const validateTour = (tournamentInfo: any, currentContext: any, messType: string) => {
  const newTourContext = JSON.parse(JSON.stringify(currentContext));

  const validateObjectWithKey = (key: string) => {
    for (const k of Object.keys(tournamentInfo[key])) {
      if (k === 'type') {
        continue;
      }
      let oldVal = currentContext[key][k];
      let newVal = tournamentInfo[key][k];
      if (key === 'gameSettings') {
        const gs = tournamentInfo.gameSettings;
        oldVal = oldVal.value;
        newVal = gs[k].value === undefined ? gs[k] : gs[k].value;
      }
      if (oldVal === undefined || typeof oldVal !== typeof newVal) {
        console.log(`WEIRDNESS IN THE NEW ${key}`);
        console.log(`oldVal: ${oldVal}, newVal: ${newVal}`);
      } else if (key === 'gameSettings') {
        newTourContext.gameSettings[k].value = newVal;
        newTourContext.gameSettings[k].type = currentContext[key][k].type;
      } else {
        newTourContext[key][k] = newVal;
      }
    }
  };

  const validateNewTournament = () => {
    validateObjectWithKey('gameSettings');
    if (tournamentInfo.gamePlan) {
      validateObjectWithKey('gamePlan');
    }
    newTourContext.tournamentId = tournamentInfo.tournamentId;
    newTourContext.tournamentName = tournamentInfo.tournamentName;
    newTourContext.winner = tournamentInfo.winner;
  };

  switch (messType) {
    case RESPONSE_TYPES.TOURNAMENT_GAME_PLAN:
      validateObjectWithKey('gamePlan');
      validateObjectWithKey('gameSettings');
      break;
    case RESPONSE_TYPES.TOURNAMENT_CREATED:
      validateNewTournament();
      break;
    case RESPONSE_TYPES.TOURNAMENT_INFO:
      validateNewTournament();
      break;
    case REQUEST_TYPES.KILL_TOURNAMENT:
      return defaultTournament;
    default:
      break;
  }

  return newTourContext;
};

export const TournamentContext = React.createContext(defaultTournament);
