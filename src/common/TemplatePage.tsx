import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components/macro';

import Header from '../common/Header';
import background from '../resources/background.jpg';

import { useRestAPIToGetActiveTournament } from './API';
import SettersContext from './contexts/SettersContext';
import TournamentContext from './contexts/TournamentContext';

export default function TemplatePage(props: any) {
  const tour = useContext(TournamentContext);
  const setters = useContext(SettersContext);
  const getActiveTournament = useRestAPIToGetActiveTournament(setters, tour);
  const [shouldFetch, setShouldFetch] = useState(true);

  useEffect(
    () => {
      if (shouldFetch && setters.settersHasBeenSet) {
        getActiveTournament();
        setShouldFetch(false);
      }
    },
    [shouldFetch, getActiveTournament, setters.settersHasBeenSet],
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
  margin-top: 20px;
  display: flex;
  justify-content: center;
`;
