import React, { useContext, useState } from 'react';

import { AccountContext } from '../common/Contexts';

import LoginForm from './LoginForm';
import LogoutForm from './LogoutForm';

export default function AccountScreen(props: any) {
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
    <div id="account-body">
      <h2>You are {accContext.loggedIn ? 'logged in!' : 'logged out!'}</h2>
      {accContext.loggedIn ? (
        <LogoutForm {...props} />
      ) : (
        <LoginForm un={username} pw={password} hc={handleChange} setLoggedIn={props.setLoggedIn} />
      )}
    </div>
  );
}
