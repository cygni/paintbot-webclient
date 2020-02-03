import React from 'react';
import styled from 'styled-components/macro';

import introImage from '../resources/images/welcome_alt.png';

export default function WelcomeScreen(props: any) {
  return <ComicImage src={introImage} />;
}

const ComicImage = styled.img`
  width: 100%;

  @media screen and (min-width: 1100px) {
    width: 70%;
  }
  @media screen and (min-width: 1600px) {
    width: 60%;
  }
`;
