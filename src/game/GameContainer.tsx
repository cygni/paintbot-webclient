import React from 'react';
import styled from 'styled-components/macro';

import GameBoardContainer from './gameboard/GameBoardContainer';
// import GameBoardFactory from './gameboard/GameBoardFactory';
import { GameController } from './gamespeed/GameController';
import ScoreBoardContainer from './scoreboard/ScoreBoardContainer';
import { TimerPane } from './timer/TimerPane';
import { Game, GameBoardState, GameSettings } from './type';

interface GameContainerProps {
  gameBoardState: GameBoardState;
  gameSettings: GameSettings;
  onPauseGame(): void;
  onRestartGame(): void;
  onGameSpeedChange(newGameSpeed: number): void;
}

interface GameContainerState {
  game: Game;
}

export default class GameContainer extends React.Component<GameContainerProps, GameContainerState> {
  /*
  private readonly gameBoardFactory = new GameBoardFactory();
  private transformGameMapToModel(gameMap: GameBoardState): Game {
    return this.gameBoardFactory.getGameBoard(gameBoardState);
  }
*/
  render() {
    const { gameSettings, gameBoardState, onGameSpeedChange, onPauseGame, onRestartGame } = this.props;
    // const game = this.transformGameMapToModel(gameMap);
    return (
      <div>
        <FlexContainer>
          <ScoreBoardContainer players={gameBoardState.characters} worldTick={gameBoardState.worldTick} />
          <div>
            <GameBoardContainer gameBoardState={gameBoardState} />
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
      </div>
    );
  }
}

const GamerControllerContainer = styled.div`
  padding: 5;
  display: flex;
  justify-content: space-between;
`;

const FlexContainer = styled.div`
  display: flex;
  flex-direction: column-reverse;
  justify-content: center;
  padding-top: 20;
  @media screen and (min-width: 1100px) {
    flex-direction: row;
  }
`;
