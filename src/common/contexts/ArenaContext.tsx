import React from 'react';

import { Arena } from '../types';

export const defaultArena: Arena = {
  currentArena: '',
  gameId: '',
  ranked: false,
  onlinePlayers: [],
  rating: new Map(),
  gameHistory: [],
};

export function extractArena(arenaMess: any) {
  const { timestamp, receivingPlayerId, ...rest } = arenaMess;
  const newArena = rest;
  return newArena;
}

const ArenaContext = React.createContext(defaultArena);

export default ArenaContext;
