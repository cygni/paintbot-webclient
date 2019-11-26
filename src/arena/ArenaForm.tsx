import React, { useContext } from 'react';
import styled from 'styled-components/macro';

import { REQUEST_TYPES } from '../common/API';
import ArenaContext from '../common/contexts/ArenaContext';
import WebSocketContext from '../common/contexts/WebSocketContext';

export default function ArenaForm(props: any) {
  const arenaContext = useContext(ArenaContext);
  const send = useContext(WebSocketContext);

  const handleSubmit = (event: any) => {
    event.preventDefault();
    const mess = {
      currentArena: event.target.value,
      type: REQUEST_TYPES.SET_CURRENT_ARENA,
    };
    send(mess);
  };

  const k = 'arenaName';
  return <Input type="text" onChange={handleSubmit} name={k} value={arenaContext.arenaName} />;
}

const Input = styled.input`
  width: 20em;
`;
