import React from 'react';
import { Heading1 } from '../common/ui/Heading';
import { Paper, PaperRow } from '../common/ui/Paper';

import Config from '../Config';

import GameContainer from './GameContainer';
import { EventType, GameSettings, GameState, GameResult } from './type';

interface Props {
  id?: string;
}

interface State {
  gameSettings: GameSettings | undefined;
  gameState: GameState | undefined;
  error?: string;
}

export default class GameDirector extends React.Component<Props, State> {
  private ws?: WebSocket;
  private readonly events: any[] = [];
  private currentEventIndex = 0;
  private updateInterval?: number;

  readonly state: State = {
    gameSettings: undefined,
    gameState: undefined,
    error: undefined,
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
        this.setState({
          gameSettings: data.gameSettings as GameSettings,
          gameState: data as GameState,
        });
      } else if (data.type === EventType.GAME_UPDATE_EVENT) {
        this.setState({ gameState: data as GameState });
      }
      else if (data.type === EventType.GAME_RESULT_EVENT) {
        const gameResult = data as GameResult;
        this.updatePointsFromGameResult(gameResult);
      }
    }

    this.currentEventIndex++;
  }

  private updatePointsFromGameResult(gameResult: GameResult) {
    const gameState = this.state.gameState;
    if (gameState) {
      gameState.map.characterInfos.forEach(c => {
        c.points = gameResult.playerRanks.filter(p => p.playerId === c.id)[0]?.points || c.points;
      });
      this.setState({ gameState: gameState });
    }
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
      const response = await fetch(`${Config.BackendUrl}/history/${this.props.id}`);
      if (response.status === 404) {
        this.setState({error: "Game not found"});
      }
      else {
        const json = await response.json();
        json.messages.forEach((msg: any) => this.events.push(msg));
      }
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
    const gameStatus = this.state.gameState?.type;
    const { gameState, gameSettings, error } = this.state;

    if (error) {
      return (
        <Paper>
          <PaperRow>
            <Heading1>Game Not Found</Heading1>
          </PaperRow>
          <PaperRow>
            This game is not in the archive.
          </PaperRow>
          <PaperRow>
            If this is a recent game, it might not have been stored yet.
            Try reloading the page in a few seconds.
          </PaperRow>
        </Paper>
      );
    }

    if (!gameStatus) {
      return <p>Loading game...</p>;
    } else if (gameStatus === EventType.GAME_STARTING_EVENT) {
      return <p>Game is starting...</p>;
    } else if ((gameStatus === EventType.GAME_UPDATE_EVENT || gameStatus === EventType.GAME_RESULT_EVENT) && gameState && gameSettings) {
      return (
        <GameContainer
          gameMap={gameState.map}
          gameSettings={gameSettings}
          onGameSpeedChange={this.updateGameSpeedInterval}
          onPauseGame={this.pauseGame}
          onRestartGame={this.restartGame}
        />
      );
    }

    return null;
  }

  render() {
    return this.getComponentToRender();
  }
}
