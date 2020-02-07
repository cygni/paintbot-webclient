import React, { useContext, useState } from 'react';

import AccountContext from '../common/contexts/AccountContext';
import TournamentContext from '../common/contexts/TournamentContext';

import TournamentController from './contr/TournamentController';
import TournamentCreator from './TournamentCreator';

export default function TournamentScreen(props: any) {
  const accContext = useContext(AccountContext);
  const tourContext = useContext(TournamentContext);
  const [child, setChild] = useState(<p>Loading</p>);
  const [c, setC] = useState(0);

  if (accContext.loggedIn && tourContext.tournamentName === '') {
    if (c !== 1) {
      setChild(<TournamentCreator />);
      setC(1);
    }
  } else if (tourContext.tournamentName !== '') {
    if (c !== 2) {
      setChild(<TournamentController />);
      setC(2);
    }
  } else {
    if (c !== 3) {
      setChild(<NoTournament />);
      setC(3);
    }
  }

  return child;
}

function NoTournament(props: any) {
  return (
    <>
      <h1>Log in to create a tournament!</h1>
    </>
  );
}
