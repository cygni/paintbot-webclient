import React from 'react';
import styled from 'styled-components/macro';

import { Heading1 } from '../common/ui/Heading';
import { Paper, PaperRow } from '../common/ui/Paper';

export default function AboutScreen(props: any) {
  return (
    <Container>
      <Paper>
        <PaperRow>
          <Heading1>About</Heading1>
        </PaperRow>
        <PaperRow>
          We at Cygni love programming. We also love a friendly competetion over a couple of beers. What better way to
          combine these two things than a battle in programming!
        </PaperRow>
        <PaperRow>
          Feel free to hack your own Paint Bot and train it in the Training room. From time to time we hold tournaments
          where you will be able to face other player's Paint Bots.
        </PaperRow>
        <PaperRow>
          The rules are configurable per game, upon every game start the clients will be notified of the current game
          settings.
        </PaperRow>
        <PaperRow>
          Here are the default rules:
          <ul>
            <li>Each client must respond within 250ms</li>
            <li>1 point per tile owned</li>
            <li>1 power-up at a time may be carried</li>
            <li>The power-up may be used at any point</li>
            <li>Using the power-up fills the tiles within Manhattan distance 4 from your bot</li>
            <li>Any other bots within the area where a power-up is used will be stunned</li>
            <li>Moving into a hole, the edge of the map or another bot will stun you</li>
            <li>10 ticks before stun is over</li>
            <li>3 ticks of invulnerability after being stunned</li>
            <li>5 holes</li>
            <li>The bot with the most tiles in the end wins</li>
          </ul>
        </PaperRow>
      </Paper>
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
