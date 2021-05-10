import React from 'react';
import styled from 'styled-components/macro';

import GameBoardContainer from './gameboard/GameBoardContainer';
import { GameController } from './gamespeed/GameController';
import ScoreBoardContainer from './scoreboard/ScoreBoardContainer';
import { TimerPane } from './timer/TimerPane';
import { GameBoardState, GameSettings } from './type';

interface GameContainerProps {
  gameBoardState: GameBoardState;
  gameSettings: GameSettings;
  onPauseGame(): void;
  onRestartGame(): void;
  onGameSpeedChange(newGameSpeed: number): void;
}

export const GameContainer = ({
  gameSettings,
  gameBoardState,
  onGameSpeedChange,
  onPauseGame,
  onRestartGame,
}: GameContainerProps) => {
  return (
    <FlexContainer>
      <ScoreBoardContainer players={gameBoardState.characters} worldTick={gameBoardState.worldTick} />
      <div>
        <GameBoardContainer gameBoardState={gameBoardState} explosionRange={gameSettings.explosionRange} />
        <GamerControllerContainer>
          <GameController
            onGameSpeedChange={onGameSpeedChange}
            onPauseGame={onPauseGame}
            onRestartGame={onRestartGame}
          />
          <TimerPane
            durationInSeconds={gameSettings.gameDurationInSeconds}
            timeInMsPerTick={gameSettings.timeInMsPerTick}
            worldTick={gameBoardState.worldTick}
          />
        </GamerControllerContainer>
      </div>
    </FlexContainer>
  );
};

const GamerControllerContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const FlexContainer = styled.div`
  display: flex;
  flex-direction: column-reverse;
  justify-content: center;
  @media screen and (min-width: 1000px) {
    flex-direction: row;
  }
`;
