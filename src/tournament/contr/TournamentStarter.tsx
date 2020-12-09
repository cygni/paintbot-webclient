import React, { useContext } from 'react';

import { REQUEST_TYPES } from '../../common/API';
import AccountContext from '../../common/contexts/AccountContext';
import TournamentContext from '../../common/contexts/TournamentContext';
import WebSocketContext from '../../common/contexts/WebSocketContext';
import DefaultButton from '../../common/ui/DefaultButton';

export default function TournamentStarter(props: any) {
  const accContext = useContext(AccountContext);
  const tourContext = useContext(TournamentContext);
  const send = useContext(WebSocketContext);

  const hc = (event: any) => {
    event.preventDefault();
    const mess = {
      token: accContext.token,
      tournamentId: tourContext.tournamentId,
      type: REQUEST_TYPES.START_TOURNAMENT,
    };
    send(mess);
  };

  return <DefaultButton onClick={hc}>Start tournament</DefaultButton>;
}
