import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components/macro';

import Header from '../common/Header';
import background from '../resources/background.jpg';

import { REQUEST_TYPES, useRestAPIToGetActiveTournament } from './API';
import SettersContext from './contexts/SettersContext';
import TournamentContext from './contexts/TournamentContext';
import WebSocketContext from './contexts/WebSocketContext';

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
        setShouldFetch(false);
      }
    },
    [shouldFetch, getActiveTournament, setters.settersHasBeenSet, send],
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
  background-repeat: no-repeat;
  background-size: cover;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
`;

const BodyContainer = styled.div`
  margin: 20px 40px;
  display: flex;
  justify-content: center;
  flex-direction: column;
`;
