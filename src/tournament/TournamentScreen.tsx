import React, { useContext, useState } from 'react';

import { AccountContext, TournamentContext, defaultTournament } from '../common/Contexts';
import Config from '../Config';

import TournamentController from './contr/TournamentController';
import TournamentCreator from './contr/TournamentCreator';
import TournamentRefresher from './tournamentRefresher';
import TournamentViewer from './TournamentViewer';

export default function TournamentScreen(props: any) {
  const accContext = useContext(AccountContext);
  const tourContext = useContext(TournamentContext);
  const [child, setChild] = useState(<p>Loading</p>);
  const [c, setC] = useState(0);

  const getActiveTournament = async () => {
    const response = await fetch(`${Config.BackendUrl}/tournament/active`);
    if (response.ok) {
      response.text().then(text => {
        const { type, ...tournament } = JSON.parse(text);
        props.setTournament(tournament, tourContext, type);
        console.log(tournament);
      });
    } else {
      props.setTournament(defaultTournament, tourContext);
    }
  };

  if (accContext.loggedIn && tourContext.tournamentName === '') {
    if (c !== 1) {
      setChild(<TournamentCreator {...props} />);
      setC(1);
    }
  } else if (accContext.loggedIn) {
    if (c !== 2) {
      setChild(<TournamentController {...props} hc={getActiveTournament} />);
      setC(2);
    }
  } else if (tourContext.tournamentName === '') {
    if (c !== 3) {
      getActiveTournament();
      setChild(<NoTournament hc={getActiveTournament} />);
      setC(3);
    }
  } else {
    if (c !== 4) {
      setChild(<TournamentViewer hc={getActiveTournament} />);
      setC(4);
    }
  }

  return <div id="tournament-body">{child}</div>;
}

function NoTournament(props: any) {
  return (
    <>
      <h1>Log in to create a tournament!</h1>
      <TournamentRefresher hc={props.hc} />
    </>
  );
}
