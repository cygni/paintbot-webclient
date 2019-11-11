import React, { useState } from 'react';

import Config from '../Config';

export default function LoginForm(props: any) {
  const [errMessage, setErrMessage] = useState('');
  const authenticate = async (event: any, un: string, pw: string, setLoggedIn: any) => {
    event.preventDefault();
    const response = await fetch(Config.LoginUrl(un, pw));
    response.text().then(text => {
      if (response.ok) {
        setErrMessage('');
        setLoggedIn(true, un, text);
      } else {
        setErrMessage(`Login attempt failed for username: ${un} and the provided password`);
      }
    });
  };

  const handleSubmit = (event: any) => authenticate(event, props.un, props.pw, props.setLoggedIn);
  return (
    <div id="login-form">
      {errMessage !== '' ? <h3>{errMessage}</h3> : ''}
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Username: </label>
        <input name="username" id="username" type="text" value={props.un} onChange={props.hc} />
        <label htmlFor="password">Password: </label>
        <input name="password" id="password" type="password" value={props.pw} onChange={props.hc} />
        <input type="submit" value="Log in" />
      </form>
    </div>
  );
}
