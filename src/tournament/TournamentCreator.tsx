import React, { useContext, useState } from 'react';

import { RESPONSE_TYPES } from '../common/Constants';
import { AccountContext } from '../common/Contexts';
import Config from '../Config';

export default function TournamentCreator(props: any) {
  const accContext = useContext(AccountContext);
  const [tourName, setTourName] = useState('');
  const [errMessage, setErrMessage] = useState('');

  const handleChange = (event: any) => {
    event.preventDefault();
    setTourName(event.target.value);
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();
    const ws = new WebSocket(Config.WebSocketApiUrl);
    const mess = {
      tournamentName: tourName,
      token: accContext.token,
      type: 'se.cygni.paintbot.eventapi.request.CreateTournament',
    };
    console.log(mess);
    ws.onopen = () => {
      ws.send(JSON.stringify(mess));
    };
    ws.onmessage = e => {
      const response = JSON.parse(e.data);
      console.log(response);
      const { type, ...tournament } = response;
      if (type === RESPONSE_TYPES.TOURNAMENT_CREATED) {
        props.setTournament(tournament);
        ws.close();
      }
    };
    ws.onerror = e => {
      console.log(e);
      setErrMessage(JSON.stringify(e));
      ws.close();
    };
  };

  return (
    <div id="tournament-creation-form">
      {errMessage !== '' ? <h3>{errMessage}</h3> : ''}
      <form onSubmit={handleSubmit}>
        <label htmlFor="tournament-name">Tournament name: </label>
        <input name="tournament-name" id="tournament-name" type="text" value={tourName} onChange={handleChange} />
        <input type="submit" value="Create tournament" />
      </form>
    </div>
  );
}
