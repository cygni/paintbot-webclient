import React from 'react';

import { Arena, Tournament } from '../types';

const SettersContext = React.createContext({
  setTournament: (tournament: any, currentContext: Tournament, messType: string) => {
    // Set your setters!
  },
  forceSetTournament: (tournament: Tournament) => {
    // Set your setters!
  },
  setAcc: (li: boolean, un: string, t: string) => {
    // Set your setters!
  },
  setTourGamePlayed: (gameId: string, isPlayed: boolean) => {
    // Set your setters!
  },
  setArena: (newArena: Arena, oldArena: Arena) => {
    // Set your setters!
  },
  settersHasBeenSet: false,
});

export default SettersContext;
