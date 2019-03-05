import React, { useEffect, useReducer, useState } from 'react';
import styled from 'styled-components/macro';

import { Row } from '../../common/ui/Row';
import Slider from '../../common/ui/Slider';
import { Spacing } from '../../common/ui/Spacing';
import Config from '../../Config';

import { PlayControlButton } from './PlayControlButton';

const GameSpeedContainer = styled.div`
  padding-left: 20px;
`;

const toggle = (state: boolean) => !state;

interface GameControllerProps {
  width?: string;
  onPauseGame(): void;
  onRestartGame(): void;
  onGameSpeedChange(newGameSpeed: number): void;
}

export function GameController({ onGameSpeedChange, onPauseGame }: GameControllerProps) {
  // These should be moved upward, since we just pass them upward in side effects anyway
  const [playing, togglePlaying] = useReducer(toggle, false);
  const [gameSpeed, setGameSpeed] = useState(Config.GameSpeedMin);

  useEffect(() => {
    if (playing) {
      onGameSpeedChange(gameSpeed);
    }
  }, [playing, gameSpeed, onGameSpeedChange]);

  useEffect(() => {
    if (!playing) {
      onPauseGame();
    }
  }, [playing, onPauseGame]);

  return (
    <Spacing>
      <Row>
        <PlayControlButton playing={playing} onClick={togglePlaying} />
        <GameSpeedContainer>
          <div>Game Speed</div>
          <Slider
            reverse
            minValue={Config.GameSpeedMin}
            maxValue={Config.GameSpeedMax}
            value={gameSpeed}
            onChange={setGameSpeed}
          />
        </GameSpeedContainer>
      </Row>
    </Spacing>
  );
}
