import React from 'react';

import Config from '../Config';

import GameContainer from './GameContainer';
import { EventType, GameSettings, GameState } from './type';

interface Props {
  id?: string;
}

interface State {
  gameSettings: GameSettings | undefined;
  gameState: GameState | undefined;
}

// TODO Handle receiving game settings when EventType === GAME_STARTING_EVENT
// TODO Handle receiving results when EventType === GAME_RESULT_EVENT

export default class GameDirector extends React.Component<Props, State> {
  private ws?: WebSocket;
  private readonly events: any[] = [];
  private currentEventIndex = 0;
  private updateInterval?: NodeJS.Timer;

  readonly state: State = {
    gameSettings: undefined,
    gameState: undefined,
  };

  private onUpdateFromServer(evt: MessageEvent) {
    this.events.push(JSON.parse(evt.data));
  }

  private readonly updateGameSpeedInterval = (milliseconds: number) => {
    if (this.updateInterval !== undefined) {
      clearInterval(this.updateInterval);
    }
    this.updateInterval = setInterval(() => {
      this.playOneTick(this.currentEventIndex);
    }, milliseconds);
  };

  private playOneTick(eventIndex: number): void {
    const data = this.events[eventIndex];
    if (data) {
      if (data.type === EventType.GAME_STARTING_EVENT) {
        this.setState({ gameSettings: data.gameSettings as GameSettings });
      } else if (data.type === EventType.GAME_UPDATE_EVENT) {
        this.setState({ gameState: data as GameState });
      }
    }

    this.currentEventIndex++;
  }

  private endGame() {
    if (this.ws !== undefined) {
      this.ws.close();
    }
    if (this.updateInterval !== undefined) {
      clearInterval(this.updateInterval);
    }
  }

  private readonly pauseGame = () => {
    if (this.updateInterval !== undefined) {
      clearInterval(this.updateInterval);
    }
  };

  private readonly restartGame = () => {
    this.currentEventIndex = 0;
  };

  async componentDidMount() {
    if (this.props.id) {
      const response = await fetch(`${Config.BackendUrl}/history/${this.props.id}`).then(r => r.json());
      response.messages.forEach((msg: any) => this.events.push(msg));
    } else {
      this.ws = new WebSocket(Config.WebSocketApiUrl);
      this.ws.onmessage = (evt: MessageEvent) => this.onUpdateFromServer(evt);
    }
    this.updateGameSpeedInterval(Config.DefaultGameSpeed);
  }

  componentWillUnmount() {
    this.endGame();
  }

  getComponentToRender() {
    if (this.state.gameSettings && this.state.gameState) {
      const gameStatus = this.state.gameState.type;
      const { gameState, gameSettings } = this.state;

      if (!gameStatus) {
        return <h1>Waiting for game</h1>;
      } else if (gameStatus === EventType.GAME_STARTING_EVENT) {
        return <h1>Game is starting</h1>;
      } else if (gameStatus === EventType.GAME_UPDATE_EVENT) {
        return (
          <GameContainer
            gameMap={gameState.map}
            gameSettings={gameSettings}
            onGameSpeedChange={this.updateGameSpeedInterval}
            onPauseGame={this.pauseGame}
            onRestartGame={this.restartGame}
          />
        );
      } else if (gameStatus === EventType.GAME_ENDED_EVENT) {
        this.endGame();
        return <h1>Game finished</h1>;
      }
    }
    return null;
  }

  render() {
    return this.getComponentToRender();
  }
}
