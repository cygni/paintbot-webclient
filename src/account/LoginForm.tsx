import React, { useContext, useState } from 'react';
import styled from 'styled-components/macro';

import { CharacterColors } from '../common/Constants';
import SettersContext from '../common/contexts/SettersContext';
import ControlsButton from '../common/ui/ControlsButton';
import { PaperRow } from '../common/ui/Paper';
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
        setErrMessage(`Login failed. Check your details and try again.`);
      }
    });
  };

  const handleSubmit = (event: any) => authenticate(event, props.un, props.pw);
  return (
    <div id="login-form">
      <form onSubmit={handleSubmit}>
        <PaperRow>
          <CenterForm>
            <InputContainer>
              <label htmlFor="username">Username</label>
              <input name="username" id="username" type="text" value={props.un} onChange={props.hc} />
            </InputContainer>
          </CenterForm>
        </PaperRow>
        <PaperRow>
          <CenterForm>
            <InputContainer>
              <label htmlFor="password">Password</label>
              <input name="password" id="password" type="password" value={props.pw} onChange={props.hc} />
            </InputContainer>
          </CenterForm>
        </PaperRow>
        <PaperRow textAlign="center">
          <ControlsButton onClick={handleSubmit}>Log in</ControlsButton>
        </PaperRow>
        {errMessage !== '' ? (
          <PaperRow>
            <Error>{errMessage}</Error>
          </PaperRow>
        ) : (
          ''
        )}
      </form>
    </div>
  );
}

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const CenterForm = styled.div`
  display: flex;
  justify-content: center;
`;

const Error = styled.span`
  color: ${CharacterColors.Red};
  font-size: 1rem;
`;
