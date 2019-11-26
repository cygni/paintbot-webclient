import React, { useContext } from 'react';

import { REQUEST_TYPES } from '../../common/API';
import AccountContext from '../../common/contexts/AccountContext';
import TournamentContext from '../../common/contexts/TournamentContext';
import WebSocketContext from '../../common/contexts/WebSocketContext';
import ControlsButton from '../../common/ui/ControlsButton';

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
    props.setStarted(true);
  };

  return <ControlsButton onClick={hc}>Start tournament</ControlsButton>;
}
