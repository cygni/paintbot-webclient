import React, { useContext } from 'react';

import { TournamentContext } from '../common/Contexts';
import Config from '../Config';

export default function GamesScreen(props: any) {
  const tourContext = useContext(TournamentContext);
  const getActiveTournament = async () => {
    const response = await fetch(`${Config.BackendUrl}/tournament/active`);
    response.text().then(text => {
      if (response.ok) {
        console.log(JSON.parse(text));
      }
    });
  };
  if (tourContext.tournamentId !== '') {
    getActiveTournament();
  }

  return <p>Active games</p>;
}
