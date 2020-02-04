import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components/macro';

import background from '../../resources/background.jpg';
import { REQUEST_TYPES, useRestAPIToGetActiveTournament } from '../API';
import SettersContext from '../contexts/SettersContext';
import TournamentContext from '../contexts/TournamentContext';
import WebSocketContext from '../contexts/WebSocketContext';
import { docCookies } from '../util';

import Header from './Header';

export default function TemplatePage(props: any) {
  const tour = useContext(TournamentContext);
  const setters = useContext(SettersContext);
  const getActiveTournament = useRestAPIToGetActiveTournament(setters, tour);
  const [shouldFetch, setShouldFetch] = useState(true);
  const send = useContext(WebSocketContext);

  useEffect(
    () => {
      if (shouldFetch && setters.settersHasBeenSet) {
        getActiveTournament();
        send({
          type: REQUEST_TYPES.GET_CURRENT_ARENA,
        });

        const token = docCookies.getItem('token');
        const name = docCookies.getItem('name');
        if (token && name) {
          setters.setAcc(true, name, token);
          send({
            type: REQUEST_TYPES.GET_ACTIVE_TOURNAMENT,
            token,
          });
        }

        setShouldFetch(false);
      }
    },
    [shouldFetch, getActiveTournament, send, setters],
  );

  return (
    <Container>
      <Header />
      <BodyContainer>{props.children}</BodyContainer>
    </Container>
  );
}

const Container = styled.div`
  background-image: url(${background});
  position: absolute;
  right: 0;
  left: 0;
  min-height: 100%;
  height: fit-content;
  min-width: fit-content;
  & h1 {
    font-size: 1.7em;
  }
  & h2 {
    font-size: 1.3em;
  }
  & h3 {
    font-size: 1.1em;
  }
  & p,
  label {
    font-size: 0.9em;
  }
  & input {
    font-size: 1.3em;
    max-width: fit-content;
    width: 80%;
  }
  & * {
    font-family: 'Sriracha', cursive;
  }
  & li {
    list-style-type: none;
  }
  & ul,
  ol {
    padding-inline-start: 0px;
  }
`;

const BodyContainer = styled.div`
  margin: 20px 40px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  & * {
    text-align: center;
  }
  & > * {
    align-self: center;
  }
`;
