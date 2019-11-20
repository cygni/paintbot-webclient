import React, { useContext, useState } from 'react';

import { REQUEST_TYPES } from '../common/API';
import ArenaContext from '../common/contexts/ArenaContext';
import WebSocketContext from '../common/contexts/WebSocketContext';

export default function ArenaForm() {
  const arenaContext = useContext(ArenaContext);
  const [currentProperties, setCurrentProperties] = useState(arenaContext);
  const send = useContext(WebSocketContext);

  const handleSubmit = (event: any) => {
    event.preventDefault();
    const mess = {
      currentArena: currentProperties.currentArena,
      type: REQUEST_TYPES.SET_CURRENT_ARENA,
    };
    send(mess);
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
