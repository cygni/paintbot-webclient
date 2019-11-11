import React, { useContext, useState } from 'react';
import styled from 'styled-components/macro';

import AccountContext from '../common/AccountContext';
import background from '../resources/background.jpg';

import LoginForm from './LoginForm';

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

  const logOut = () => props.setLoggedIn(false);

  return (
    <Container>
      {props.header}
      <BodyContainer>
        <h2>You are {accContext.loggedIn ? 'logged in!' : 'logged out!'}</h2>
        {accContext.loggedIn ? (
          <button onClick={logOut}>Log out</button>
        ) : (
          <LoginForm un={username} pw={password} hc={handleChange} setLoggedIn={props.setLoggedIn} />
        )}
      </BodyContainer>
    </Container>
  );
}

const Container = styled.div`
  background-image: url(${background});
  position: absolute;
  background-repeat: no-repeat;
  background-size: cover;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
`;

const BodyContainer = styled.div`
  margin-top: 20px;
  display: flex;
  justify-content: center;
`;
