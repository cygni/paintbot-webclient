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
      currentArena: currentProperties.arenaName,
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

  const k = 'arenaName';
  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor={k}>{k}</label>
      <input type="text" onChange={updateProperty} name={k} value={currentProperties.arenaName} />
      <input type="submit" value="View arena" />
    </form>
  );
}
