import React, { useContext, useState } from 'react';
import styled from 'styled-components/macro';

import { REQUEST_TYPES } from '../common/API';
import AccountContext from '../common/contexts/AccountContext';
import WebSocketContext from '../common/contexts/WebSocketContext';
import ControlsButton from '../common/ui/ControlsButton';
import { Heading1 } from '../common/ui/Heading';

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
    <>
      <Heading1>Create a tournament</Heading1>
      <Form onSubmit={handleSubmit}>
        <Input name="tournament-name" id="tournament-name" type="text" value={tourName} onChange={handleChange} />
        <ControlsButton onClick={handleSubmit}>Let's go!</ControlsButton>
      </Form>
    </>
  );
}

const Form = styled.form`
  margin-top: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Input = styled.input`
  margin-bottom: 1em;
`;
