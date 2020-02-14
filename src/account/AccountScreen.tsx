import React, { useContext, useState } from 'react';

import AccountContext from '../common/contexts/AccountContext';
import { Heading1 } from '../common/ui/Heading';
import { Paper, PaperRow } from '../common/ui/Paper';

import LoginForm from './LoginForm';
import LogoutForm from './LogoutForm';

export default function AccountScreen() {
  const accContext = useContext(AccountContext);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleChange = (event: any) => {
    event.preventDefault();
    if (event.target.name === 'username') {
      setUsername(event.target.value);
    } else if (event.target.name === 'password') {
      setPassword(event.target.value);
    }
  };

  return (
    <Paper width="400px">
      <PaperRow textAlign="center">{accContext.loggedIn ? 'You are logged in!' : <Heading1>Log in</Heading1>}</PaperRow>
      {accContext.loggedIn ? <LogoutForm /> : <LoginForm un={username} pw={password} hc={handleChange} />}
    </Paper>
  );
}
