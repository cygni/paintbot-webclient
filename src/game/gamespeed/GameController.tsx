import React, { useEffect, useReducer, useState } from 'react';
import styled from 'styled-components/macro';

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
  const [gameSpeed, setGameSpeed] = useState(Config.DefaultGameSpeed);

  useEffect(
    () => {
      if (playing) {
        onGameSpeedChange(gameSpeed);
      }
    },
    [playing, gameSpeed, onGameSpeedChange],
  );

  useEffect(
    () => {
      if (!playing) {
        onPauseGame();
      }
    },
    [playing, onPauseGame],
  );

  const handleOnGameSpeedChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number.parseInt(event.target.value, 10);
    if (!Number.isNaN(value)) {
      setGameSpeed(value);
    }
  };

  return (
    <FlexContainer>
      <PlayControlButton playing={playing} onClick={togglePlaying} />
      <GameSpeedContainer role="radiogroup">
        <label>
          <input type="radio" name="gameSpeed" value={Config.GameSpeedMax} onChange={handleOnGameSpeedChange} />
          x0.5
        </label>
        <label>
          <input type="radio" name="gameSpeed" value={Config.DefaultGameSpeed} onChange={handleOnGameSpeedChange} />
          x1
        </label>
        <label>
          <input type="radio" name="gameSpeed" value={Config.GameSpeedMin} onChange={handleOnGameSpeedChange} />
          x6
        </label>
      </GameSpeedContainer>
    </FlexContainer>
  );
}

const FlexContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;
