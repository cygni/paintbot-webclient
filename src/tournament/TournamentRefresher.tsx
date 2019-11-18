import React from 'react';

import { useRestAPIToGetActiveTournament } from '../common/API';

export default function TournamentRefresher(props: any) {
  const getActiveTournament = useRestAPIToGetActiveTournament();

  return <button onClick={getActiveTournament}>Refresh</button>;
}
