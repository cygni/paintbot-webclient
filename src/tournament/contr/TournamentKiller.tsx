import React, { useContext } from 'react';

import { REQUEST_TYPES } from '../../common/API';
import AccountContext from '../../common/contexts/AccountContext';
import TournamentContext from '../../common/contexts/TournamentContext';
import WebSocketContext from '../../common/contexts/WebSocketContext';

export default function TournamentKiller() {
  const accContext = useContext(AccountContext);
  const tourContext = useContext(TournamentContext);
  const send = useContext(WebSocketContext);

  const handleClick = (event: any) => {
    event.preventDefault();
    const killMess = {
      token: accContext.token,
      tournamentId: tourContext.tournamentId,
      type: REQUEST_TYPES.KILL_TOURNAMENT,
    };
    send(killMess);
  };
  return <button onClick={handleClick}>Kill tournament</button>;
}
