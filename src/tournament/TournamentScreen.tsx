import React, { useContext } from 'react';

import { AccountContext, TournamentContext } from '../common/Contexts';

import TournamentCreator from './TournamentCreator';
import TournamentPropertySetter from './TournamentPropertySetter';

export default function TournamentScreen(props: any) {
  const accContext = useContext(AccountContext);
  const tourContext = useContext(TournamentContext);
  const child = accContext.loggedIn ? (
    tourContext.tournamentName === '' ? (
      <TournamentCreator {...props} />
    ) : (
      <TournamentPropertySetter {...props} />
    )
  ) : (
    <h2>You need to log in to create a tournament!</h2>
  );
  return <div id="tournament-body">{child}</div>;
}
