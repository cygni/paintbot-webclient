import React from 'react';
import styled from 'styled-components/macro';

import { GameControllerColors } from '../common/Constants';
import { Row } from '../common/ui/Row';
import Config from '../Config';

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
          <GameNameContainer>PAINTBOT</GameNameContainer>
          <TimerPane
            durationInSeconds={Config.TimerSeconds}
            timeInMsPerTick={gameSettings.timeInMsPerTick}
            worldTick={gameMap.worldTick}
          />
        </HeaderContainer>
        <Row justifyContent={'center'} style={{ paddingTop: 20 }}>
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
        </Row>
      </div>
    );
  }
}

const GamerControllerContainer = styled.div`
  padding: 5;
  background-color: ${GameControllerColors.Background};
`;

const HeaderContainer = styled.div`
  position: relative;
  display: flex;
  padding: 10px;
  font-size: 40px;
  justify-content: center;
  flex-direction: row;
`;

const GameNameContainer = styled.div`
  position: absolute;
  left: 0;
`;
