import React from 'react';
import styled from 'styled-components/macro';
import tinycolor from 'tinycolor2';

import { Spacing } from '../../common/ui/Spacing';
import { Character } from '../type';

interface Props {
  player: Character;
}

interface ScoreLabelContainerProps {
  playerColour: string;
}

function isDarkColor(color: string) {
  const c = tinycolor(color);
  return c.isDark();
}

const ScoreLabelContainer = styled.div<ScoreLabelContainerProps>`
  opacity: 1;
  background-color: ${props => props.playerColour};
  color: ${props => (isDarkColor(props.playerColour) ? 'white' : 'black')};
  font-size: 32px;
  transition: position 0.5s linear;
`;

export default class ScoreBoardEntry extends React.Component<Props> {
  shouldComponentUpdate(nextProps: Props) {
    return nextProps.player.points !== this.props.player.points;
  }

  render() {
    const { player } = this.props;
    const playerName = player.name;
    const playerScore = `${player.points}`;
    return (
      <Spacing>
        <ScoreLabelContainer playerColour={player.colour} data-testid="score-board-entry">
          <Card>
            <Name>{playerName}</Name>
            <Score>{playerScore}</Score>
          </Card>
        </ScoreLabelContainer>
      </Spacing>
    );
  }
}

const Name = styled.div`
  font-weight: bold;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  font-size: 20px;
  text-align: left;
`;

const Score = styled.div`
  text-align: right;
  opacity: 0.5;
  font-size: 40px;
  line-height: 25px;
`;

const Card = styled.div`
  box-shadow: 0 3px 3px rgba(0, 0, 0, 0.5);
  padding: 10px;
  font-family: 'Nanum Pen Script', sans-serif;
`;
