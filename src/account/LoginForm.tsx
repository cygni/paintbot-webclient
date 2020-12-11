import React, { useContext, useState } from 'react';
import styled from 'styled-components/macro';

import { CharacterColors } from '../common/Constants';
import SettersContext from '../common/contexts/SettersContext';
import DefaultButton from '../common/ui/DefaultButton';
import { Heading1 } from '../common/ui/Heading';
import Input from '../common/ui/Input';
import { PaperRow } from '../common/ui/Paper';
import Config from '../Config';

export default function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errMessage, setErrMessage] = useState('');

  const setters = useContext(SettersContext);

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    fetch(Config.LoginUrl(username, password)).then(response => {
      response.text().then(token => {
        if (response.ok) {
          setErrMessage('');
          setters.setAcc(true, username, token);
        } else {
          setErrMessage('Login failed. Check your details and try again.');
        }
      });
    });
  }

  return (
    <form onSubmit={handleSubmit}>
      <PaperRow>
        <Heading1>Log in</Heading1>
      </PaperRow>
      <PaperRow>
        <Input label="Username" type="text" value={username} onChange={e => setUsername(e.target.value)} />
      </PaperRow>
      <PaperRow>
        <Input label="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} />
      </PaperRow>
      <PaperRow>
        <DefaultButton onClick={handleSubmit} width="100%">
          Log in
        </DefaultButton>
      </PaperRow>
      {errMessage !== '' && (
        <PaperRow>
          <Error>{errMessage}</Error>
        </PaperRow>
      )}
    </form>
  );
}

const Error = styled.span`
  color: ${CharacterColors.Red};
`;
