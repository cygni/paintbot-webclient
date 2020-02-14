import React from 'react';
import styled from 'styled-components/macro';

import { DefaultLink } from '../common/ui/DefaultLink';
import { Heading1 } from '../common/ui/Heading';
import { Paper, PaperRow } from '../common/ui/Paper';
import introImage1 from '../resources/images/welcome1.png';
import introImage2 from '../resources/images/welcome2.png';

export default function WelcomeScreen(props: any) {
  return (
    <Container>
      <Paper>
        <PaperRow>
          <Heading1>Welcome!</Heading1>
        </PaperRow>
        <PaperRow>You know how life is all about material possessions? No? Well, at least this game is.</PaperRow>
        <PaperRow>
          To play, you need to program your own Paint Bot and you will be competing against other bots! The concept is
          simple: your bot can move UP, DOWN, RIGHT or LEFT. While moving, it will paint the paper beneath it. The
          winner is the color that covers most of the paper in the end. You can also pick up power-ups that will allow
          you to paint a larger area around you. Look out for holes in the paper though!
        </PaperRow>
        <PaperRow>
          <DefaultLink to={'readme'}>Getting started is really easy.</DefaultLink> Clone an example Paint bot and get
          going!
        </PaperRow>
        <PaperRow>Here's a video of what gameplay looks like:</PaperRow>
        <PaperRow>
          <iframe
            width="560"
            height="315"
            src="https://www.youtube.com/embed/G6M7RpQaInQ"
            title="Paintbot gameplay"
            frameBorder={0}
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </PaperRow>
      </Paper>
      <ComicImages>
        <ComicImage src={introImage1} alt="Blue, green, red, yellow..." />
        <ComicImage
          src={introImage2}
          alt="Long ago, all the colors lived together in harmony. Then, everything changed when the red nuance attacked."
        />
      </ComicImages>
    </Container>
  );
}

const Container = styled.div`
  width: 100%;

  @media screen and (min-width: 1100px) {
    width: 70%;
  }
  @media screen and (min-width: 1600px) {
    width: 60%;
  }
`;

const ComicImages = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;

  @media screen and (min-width: 800px) {
    flex-direction: row;
  }
`;

function ComicImage({ src, alt }: { src: string; alt: string }) {
  return (
    <ImageContainer>
      <img src={src} alt={alt} />
    </ImageContainer>
  );
}

const ImageContainer = styled.div`
  flex: 1;

  :first-child {
    margin: 0 0 1rem;
  }

  img {
    width: 100%;
  }

  @media screen and (min-width: 800px) {
    :first-child {
      margin: 0 1rem 0 0;
    }
  }
`;
