import React, { useContext } from 'react';

import sendPaintBotMessage, { REQUEST_TYPES, RESPONSE_TYPES, useRestAPIToGetActiveTournament } from '../../common/API';
import AccountContext from '../../common/contexts/AccountContext';
import SettersContext from '../../common/contexts/SettersContext';
import TournamentContext from '../../common/contexts/TournamentContext';
import { GamePlan } from '../../common/types';

export default function TournamentStarter() {
  const setters = useContext(SettersContext);
  const accContext = useContext(AccountContext);
  const tourContext = useContext(TournamentContext);
  const getActiveTournament = useRestAPIToGetActiveTournament();

  const hc = (event: any) => {
    event.preventDefault();
    const mess = {
      token: accContext.token,
      tournamentId: tourContext.tournamentId,
      type: REQUEST_TYPES.START_TOURNAMENT,
    };
    const cb = (response: GamePlan, type: string) => {
      setters.setTournament(response, tourContext, type);
      getActiveTournament();
    };
    sendPaintBotMessage(mess, RESPONSE_TYPES.TOURNAMENT_GAME_PLAN, cb, (err: any) => {
      console.log(err);
    });
  };

  return <button onClick={hc}>Start tournament</button>;
}
