import React, { useContext, useState } from 'react';

import { AccountContext, TournamentContext } from '../common/Contexts';

import TournamentCreator from './TournamentCreator';
import TournamentPropertySetter from './TournamentPropertySetter';
// import Config from '../Config';

export default function TournamentScreen(props: any) {
  const accContext = useContext(AccountContext);
  const tourContext = useContext(TournamentContext);
  const [child, setChild] = useState(<p>Loading</p>);
  const [c, setC] = useState(0);

  /*  const getActiveTournament = async () => {
      const response = await fetch(`${Config.BackendUrl}/tournament/active`);
      response.text().then(text => {
        if (response.ok) {
          console.log(JSON.parse(text));
        }
      });
    }*/

  if (accContext.loggedIn && tourContext.tournamentName === '') {
    if (c !== 1) {
      setChild(<TournamentCreator {...props} />);
      setC(1);
    }
  } else if (accContext.loggedIn) {
    if (c !== 2) {
      setChild(<TournamentPropertySetter {...props} />);
      setC(2);
    }
  } else if (tourContext.tournamentName === '') {
    if (c !== 3) {
      setChild(<h1>Log in to create a tournament!</h1>);
      setC(3);
    }
  } else {
    if (c !== 4) {
      setChild(<h2>There is an active tournament</h2>);
      setC(4);
    }
  }

  return <div id="tournament-body">{child}</div>;
}
