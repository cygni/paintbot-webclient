import React from 'react';

import { Tournament } from '../types';

const SettersContext = React.createContext({
  setTournament: (tournament: any, currentContext: Tournament, messType: string) => {
    console.log('Set your setters!');
  },
  setAcc: (li: boolean, un: string, t: string) => {
    console.log('Set your setters!');
  },
  setTourGamePlayed: (gameId: string, isPlayed: boolean) => {
    console.log('Set your setters!');
  },
});

export default SettersContext;
