import React from 'react';

import { Arena } from '../types';

export const defaultArena: Arena = {
  arenaName: 'arena',
  gameId: '',
  ranked: false,
  onlinePlayers: [],
  rating: new Map(),
  gameHistory: [],
};

export function extractArena(arenaMess: any) {
  const { timestamp, receivingPlayerId, ...newArena } = arenaMess;
  return newArena;
}

const ArenaContext = React.createContext(defaultArena);

export default ArenaContext;
