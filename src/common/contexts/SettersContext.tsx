import React from 'react';

import { Arena, Tournament } from '../types';

const SettersContext = React.createContext({
  setTournament: (tournament: any, currentContext: Tournament, messType: string) => {
    console.log('Set your setters!');
  },
  forceSetTournament: (tournament: Tournament) => {
    console.log('Set your setters!');
  },
  setAcc: (li: boolean, un: string, t: string) => {
    console.log('Set your setters!');
  },
  setTourGamePlayed: (gameId: string, isPlayed: boolean) => {
    console.log('Set your setters!');
  },
  setArena: (arena: Arena) => {
    console.log('Set your setters!');
  },
  settersHasBeenSet: false,
});

export default SettersContext;
