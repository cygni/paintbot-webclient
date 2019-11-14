import React, { useContext } from 'react';

import sendPaintBotMessage, { REQUEST_TYPES, RESPONSE_TYPES } from '../../common/API';
import { AccountContext, TournamentContext } from '../../common/Contexts';

export default function TournamentStarter(props: any) {
  const accContext = useContext(AccountContext);
  const tourContext = useContext(TournamentContext);

  const hc = (event: any) => {
    event.preventDefault();
    const mess = {
      token: accContext.token,
      tournamentId: tourContext.tournamentId,
      type: REQUEST_TYPES.START_TOURNAMENT,
    };
    const cb = (response: any, type: string) => {
      props.setTournament(response, tourContext, type);
    };
    sendPaintBotMessage(mess, RESPONSE_TYPES.TOURNAMENT_GAME_PLAN, cb, (err: any) => {
      console.log(err);
    });
  };

  return <button onClick={hc}>Start tournament</button>;
}
