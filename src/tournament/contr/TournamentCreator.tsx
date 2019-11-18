import React, { useContext, useState } from 'react';

import sendPaintBotMessage, { REQUEST_TYPES, RESPONSE_TYPES } from '../../common/API';
import { useRestAPIToGetActiveTournament } from '../../common/API';
import AccountContext from '../../common/contexts/AccountContext';

export default function TournamentCreator() {
  const accContext = useContext(AccountContext);
  const tournamentUpdater = useRestAPIToGetActiveTournament();
  const [tourName, setTourName] = useState('');
  const [errMessage, setErrMessage] = useState('');

  const handleChange = (event: any) => {
    event.preventDefault();
    setTourName(event.target.value);
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();
    const creationCallback = (gameSettings: any, creationResponse: string) => {
      const updateMess = {
        gameSettings,
        token: accContext.token,
        type: REQUEST_TYPES.UPDATE_TOURNAMENT,
      };
      const updateCallback = (gamePlan: any, updateResponseType: string) => {
        tournamentUpdater();
      };
      sendPaintBotMessage(updateMess, RESPONSE_TYPES.TOURNAMENT_GAME_PLAN, updateCallback, (err: any) => {
        console.log(err);
      });
    };

    const creationMess = {
      tournamentName: tourName,
      token: accContext.token,
      type: REQUEST_TYPES.CREATE_TOURNAMENT,
    };
    sendPaintBotMessage(creationMess, RESPONSE_TYPES.TOURNAMENT_CREATED, creationCallback, setErrMessage);
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
