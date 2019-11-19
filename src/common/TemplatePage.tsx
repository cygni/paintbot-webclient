import React, { useEffect } from 'react';
import styled from 'styled-components/macro';

import Header from '../common/Header';
import background from '../resources/background.jpg';

import { useRestAPIToGetActiveTournament } from './API';

export default function TemplatePage(props: any) {
  const getActiveTournament = useRestAPIToGetActiveTournament();

  useEffect(
    () => {
      getActiveTournament();
    },
    [getActiveTournament],
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
