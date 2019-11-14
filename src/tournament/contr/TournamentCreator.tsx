import React, { useContext, useState } from 'react';

import sendPaintBotMessage, { REQUEST_TYPES, RESPONSE_TYPES } from '../../common/API';
import { AccountContext, defaultTournament } from '../../common/Contexts';

export default function TournamentCreator(props: any) {
  const accContext = useContext(AccountContext);
  const [tourName, setTourName] = useState('');
  const [errMessage, setErrMessage] = useState('');

  const handleChange = (event: any) => {
    event.preventDefault();
    setTourName(event.target.value);
  };

  const handleSubmit = (event: any) => {
    const cb = (response: any, type: string) => {
      props.setTournament(response, defaultTournament, type);
    };
    event.preventDefault();

    const mess = {
      tournamentName: tourName,
      token: accContext.token,
      type: REQUEST_TYPES.CREATE_TOURNAMENT,
    };
    sendPaintBotMessage(mess, RESPONSE_TYPES.TOURNAMENT_CREATED, cb, setErrMessage);
  };

  return (
    <div id="tournament-creation-form">
      {errMessage !== '' ? <h3>{errMessage}</h3> : ''}
      <form onSubmit={handleSubmit}>
        <label htmlFor="tournament-name">Tournament name: </label>
        <input name="tournament-name" id="tournament-name" type="text" value={tourName} onChange={handleChange} />
        <input type="submit" value="Set name" />
      </form>
    </div>
  );
}
