import React, { useContext, useState } from 'react';
import styled from 'styled-components/macro';

import { REQUEST_TYPES } from '../../common/API';
import AccountContext from '../../common/contexts/AccountContext';
import WebSocketContext from '../../common/contexts/WebSocketContext';
import ControlsButton from '../../common/ui/ControlsButton';

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
    <FlexColumn>
      <h1>Create a tournament</h1>
      <form onSubmit={handleSubmit}>
        <input name="tournament-name" id="tournament-name" type="text" value={tourName} onChange={handleChange} />
        <ControlsButton onClick={handleSubmit}>Lets go!</ControlsButton>
      </form>
    </FlexColumn>
  );
}

const FlexColumn = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  form * {
    margin-bottom: 1em;
  }
`;
