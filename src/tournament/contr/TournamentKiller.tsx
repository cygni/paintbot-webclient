import React, { useContext } from 'react';

import sendPaintBotMessage, { REQUEST_TYPES, RESPONSE_TYPES } from '../../common/API';
import AccountContext from '../../common/contexts/AccountContext';
import SettersContext from '../../common/contexts/SettersContext';
import TournamentContext, { defaultTournament } from '../../common/contexts/TournamentContext';

export default function TournamentKiller() {
  const setters = useContext(SettersContext);
  const accContext = useContext(AccountContext);
  const tourContext = useContext(TournamentContext);
  const handleClick = (event: any) => {
    event.preventDefault();
    const mess = {
      token: accContext.token,
      tournamentId: tourContext.tournamentId,
      type: REQUEST_TYPES.KILL_TOURNAMENT,
    };
    const cb = (response: any, type: string) => {
      setters.setTournament(defaultTournament, tourContext, REQUEST_TYPES.KILL_TOURNAMENT);
    };
    sendPaintBotMessage(mess, RESPONSE_TYPES.ACTIVE_GAMES_LIST, cb, (err: any) => {
      console.log(err);
    });
  };
  return <button onClick={handleClick}>Kill tournament</button>;
}
