import React from 'react';
import styled from 'styled-components/macro';

import introImage from '../resources/images/welcome.png';

export default function WelcomeScreen(props: any) {
  return <ComicImage src={introImage} />;
}

const ComicImage = styled.img`
  width: 70%;
  height: 70%;
`;
