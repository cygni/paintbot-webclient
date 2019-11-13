import React, { useContext, useState } from 'react';

import { AccountContext, TournamentContext } from '../common/Contexts';
import sendPaintBotMessage, { REQUEST_TYPES, RESPONSE_TYPES, preProcessGameSettings } from '../common/WebSockets';

import FormComponent from './FormComponent';

export default function TournamentPropertySetter(props: any) {
  const tourContext = useContext(TournamentContext);
  const accContext = useContext(AccountContext);
  const [currentProperties, setCurrentProperties] = useState(JSON.parse(JSON.stringify(tourContext)));
  const gameSettings = currentProperties.gameSettings;

  const handleSubmit = (event: any) => {
    event.preventDefault();
    const gs = preProcessGameSettings(gameSettings);
    const mess = {
      gameSettings: gs,
      token: accContext.token,
      type: REQUEST_TYPES.UPDATE_TOURNAMENT,
    };
    sendPaintBotMessage(mess, RESPONSE_TYPES.TOURNAMENT_GAME_PLAN, props.setTournament, (err: any) => {
      console.log(err);
    });
  };

  const updateProperty = (propKey: string, propValue: any) => {
    const copy = JSON.parse(JSON.stringify(currentProperties));
    if (propKey === 'tournamentId' || propKey === 'tournamentName') {
      copy[propKey] = propValue;
    } else {
      copy.gameSettings[propKey].value = propValue;
    }
    setCurrentProperties(copy);
  };

  const inputs: any = [];
  for (const k in gameSettings) {
    if (gameSettings.hasOwnProperty(k)) {
      const setting = gameSettings[k];
      const { value, type, range } = setting;
      inputs.push(
        <FormComponent
          key={k}
          k={k}
          v={value}
          type={type}
          range={range}
          oc={updateProperty}
          currentContextValue={tourContext.gameSettings[k].value}
        />,
      );
    }
  }

  return (
    <div id="tournament-configuration-form">
      <h1>Name: {tourContext.tournamentName}</h1>
      <form onSubmit={handleSubmit}>
        {inputs}
        <input type="submit" value="Update tournament" />
      </form>
    </div>
  );
}
