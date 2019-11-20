import React, { useContext, useState } from 'react';

import { REQUEST_TYPES } from '../../common/API';
import AccountContext from '../../common/contexts/AccountContext';
import WebSocketContext from '../../common/contexts/WebSocketContext';

export default function TournamentCreator() {
  const accContext = useContext(AccountContext);
  const [tourName, setTourName] = useState('');
  const send = useContext(WebSocketContext);

  const handleChange = (event: any) => {
    event.preventDefault();
    setTourName(event.target.value);
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();

    const creationMess = {
      tournamentName: tourName,
      token: accContext.token,
      type: REQUEST_TYPES.CREATE_TOURNAMENT,
    };
    send(creationMess);
  };

  return (
    <div id="tournament-creation-form">
      <form onSubmit={handleSubmit}>
        <label htmlFor="tournament-name">Tournament name: </label>
        <input name="tournament-name" id="tournament-name" type="text" value={tourName} onChange={handleChange} />
        <input type="submit" value="Create tournament" />
      </form>
    </div>
  );
}
