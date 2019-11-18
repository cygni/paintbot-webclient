import React, { useContext, useEffect, useState } from 'react';

import { useRestAPIToGetActiveTournament } from '../common/API';
import AccountContext from '../common/contexts/AccountContext';
import TournamentContext from '../common/contexts/TournamentContext';

import TournamentController from './contr/TournamentController';
import TournamentCreator from './contr/TournamentCreator';
import TournamentViewer from './TournamentViewer';

export default function TournamentScreen(props: any) {
  const accContext = useContext(AccountContext);
  const tourContext = useContext(TournamentContext);
  const [child, setChild] = useState(<p>Loading</p>);
  const [c, setC] = useState(0);
  const getActiveTournament = useRestAPIToGetActiveTournament();

  if (accContext.loggedIn && tourContext.tournamentName === '') {
    if (c !== 1) {
      getActiveTournament();
      setChild(<TournamentCreator />);
      setC(1);
    }
  } else if (accContext.loggedIn) {
    if (c !== 2) {
      getActiveTournament();
      setChild(<TournamentController />);
      setC(2);
    }
  } else if (tourContext.tournamentName === '') {
    if (c !== 3) {
      getActiveTournament();
      setChild(<NoTournament />);
      setC(3);
    }
  } else {
    if (c !== 4) {
      setChild(<TournamentViewer />);
      setC(4);
    }
  }

  return <div id="tournament-body">{child}</div>;
}

function NoTournament(props: any) {
  const getActiveTournament = useRestAPIToGetActiveTournament();
  useEffect(() => {
    getActiveTournament();
  });
  return (
    <>
      <h1>Log in to create a tournament!</h1>
    </>
  );
}
