import React, { useContext, useState } from 'react';

import sendPaintBotMessage, { REQUEST_TYPES, RESPONSE_TYPES } from '../common/API';
import ArenaContext from '../common/contexts/ArenaContext';

export default function ArenaForm(props: any) {
  const arenaContext = useContext(ArenaContext);
  const [currentProperties, setCurrentProperties] = useState(JSON.parse(JSON.stringify(arenaContext)));

  const handleSubmit = (event: any) => {
    event.preventDefault();
    const mess = JSON.parse(JSON.stringify(currentProperties));
    mess.type = REQUEST_TYPES.SET_CURRENT_ARENA;
    const cb = (response: any, type: string) => {
      props.setArena(currentProperties);
    };
    sendPaintBotMessage(mess, RESPONSE_TYPES.ARENA_UPDATE_EVENT, cb, (err: any) => {
      console.log(err);
    });
  };

  const updateProperty = (event: any) => {
    const copy = JSON.parse(JSON.stringify(currentProperties));
    const propKey = event.target.name;
    const propValue = event.target.value;
    copy[propKey] = propValue;
    setCurrentProperties(copy);
  };

  const inputs: any = [];
  for (const k of Object.keys(currentProperties)) {
    const value = currentProperties[k];
    inputs.push(
      <div key={k}>
        <label htmlFor={k}>{k}</label>
        <input type="text" onChange={updateProperty} name={k} value={value} />
      </div>,
    );
  }

  return (
    <form onSubmit={handleSubmit}>
      {inputs}
      <input type="submit" value="Set arena" />
    </form>
  );
}
