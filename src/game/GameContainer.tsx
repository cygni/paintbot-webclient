import React from 'react';
import styled from 'styled-components/macro';

import { GameControllerColors } from '../common/Constants';

import GameBoardContainer from './gameboard/GameBoardContainer';
import GameBoardFactory from './gameboard/GameBoardFactory';
import { GameController } from './gamespeed/GameController';
import ScoreBoardContainer from './scoreboard/ScoreBoardContainer';
import { TimerPane } from './timer/TimerPane';
import { Game, GameMap, GameSettings } from './type';

interface GameContainerProps {
  gameMap: GameMap;
  gameSettings: GameSettings;
  onPauseGame(): void;
  onRestartGame(): void;
  onGameSpeedChange(newGameSpeed: number): void;
}

interface GameContainerState {
  game: Game;
}

export default class GameContainer extends React.Component<GameContainerProps, GameContainerState> {
  private readonly gameBoardFactory = new GameBoardFactory();

  private transformGameMapToModel(gameMap: GameMap): Game {
    return this.gameBoardFactory.getGameBoard(gameMap);
  }

  render() {
    const { gameSettings, gameMap, onGameSpeedChange, onPauseGame, onRestartGame } = this.props;
    const game = this.transformGameMapToModel(gameMap);
    return (
      <div>
        <HeaderContainer>
          <div>PAINTBOT</div>
          <TimerPane
            durationInSeconds={gameSettings.gameDurationInSeconds}
            timeInMsPerTick={gameSettings.timeInMsPerTick}
            worldTick={gameMap.worldTick}
          />
        </HeaderContainer>
        <FlexContainer>
          <ScoreBoardContainer players={game.currentCharacters} worldTick={game.worldTick} />
          <div>
            <GameBoardContainer game={game} />
            <GamerControllerContainer>
              <GameController
                onGameSpeedChange={onGameSpeedChange}
                onPauseGame={onPauseGame}
                onRestartGame={onRestartGame}
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
  background-color: ${GameControllerColors.Background};
`;

const HeaderContainer = styled.div`
  display: flex;
  padding: 10px;
  font-size: 40px;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  & > * {
    margin: 5px;
  }
  @media screen and (min-width: 1100px) {
    position: relative;
    flex-direction: row;
    justify-content: flex-start;
    & > * {
      margin-left: 40px;
      margin-right: 40px;
    }
  }
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
