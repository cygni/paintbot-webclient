import React, { useContext, useState } from 'react';
import styled from 'styled-components/macro';

import SettersContext from '../common/contexts/SettersContext';
import ControlsButton from '../common/ui/ControlsButton';
import Config from '../Config';

export default function LoginForm(props: any) {
  const setters = useContext(SettersContext);
  const [errMessage, setErrMessage] = useState('');
  const authenticate = async (event: any, un: string, pw: string) => {
    event.preventDefault();
    const response = await fetch(Config.LoginUrl(un, pw));
    response.text().then(token => {
      if (response.ok) {
        setErrMessage('');
        setters.setAcc(true, un, token);
      } else {
        setErrMessage(`Login attempt failed for username: ${un} and the provided password`);
      }
    });
  };

  const handleSubmit = (event: any) => authenticate(event, props.un, props.pw);
  return (
    <div id="login-form">
      {errMessage !== '' ? <h3>{errMessage}</h3> : ''}
      <form onSubmit={handleSubmit}>
        <FlexColumn>
          <FlexColumn>
            <label htmlFor="username">Username: </label>
            <input name="username" id="username" type="text" value={props.un} onChange={props.hc} />
          </FlexColumn>

          <FlexColumn>
            <label htmlFor="password">Password: </label>
            <input name="password" id="password" type="password" value={props.pw} onChange={props.hc} />
          </FlexColumn>

          <ControlsButton onClick={handleSubmit}>Log in</ControlsButton>
        </FlexColumn>
      </form>
    </div>
  );
}

const FlexColumn = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 1em;
`;
