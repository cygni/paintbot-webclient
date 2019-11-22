import React from 'react';

import { Arena, Tournament } from '../types';

const SettersContext = React.createContext({
  setTournament: (tournament: any, currentContext: Tournament, messType: string) => {
    console.log('called setTournament');
    console.log('Set your setters!');
  },
  forceSetTournament: (tournament: Tournament) => {
    console.log('called forceSetTournament');
    console.log('Set your setters!');
  },
  setAcc: (li: boolean, un: string, t: string) => {
    console.log('called setAcc');
    console.log('Set your setters!');
  },
  setTourGamePlayed: (gameId: string, isPlayed: boolean) => {
    console.log('called setTourGamePlayed');
    console.log('Set your setters!');
  },
  setArena: (newArena: Arena, oldArena: Arena) => {
    console.log('called setArena');
    console.log('Set your setters!');
  },
  settersHasBeenSet: false,
});

export default SettersContext;
