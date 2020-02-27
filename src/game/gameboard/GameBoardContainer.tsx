import React from 'react';

import { Character, Coordinate, Game } from '../type';

interface Props {
  game: Game;
}

enum Direction {
  UP,
  RIGHT,
  DOWN,
  LEFT,
}

export default class GameBoardContainer extends React.Component<Props> {
  private readonly boardWidth: number;
  private readonly boardHeight: number;
  private readonly tileSize: number;
  private readonly canvasRef = React.createRef<HTMLCanvasElement>();

  constructor(props: Props) {
    super(props);
    const { width, height } = this.props.game;
    this.tileSize = this.calculateTileSize(width);
    this.boardWidth = width * this.tileSize;
    this.boardHeight = height * this.tileSize;
  }

  private renderPaper(ctx: CanvasRenderingContext2D) {
    const paperTiles = this.getPaperTiles();
    paperTiles.forEach(tile => {
      ctx.fillStyle = 'white';
      ctx.fillRect(tile.x * this.tileSize, tile.y * this.tileSize, this.tileSize, this.tileSize);
    });
  }

  private renderTiles(ctx: CanvasRenderingContext2D) {
    const tiles = Array.from(this.props.game.tiles.values());
    const { currentCharacters } = this.props.game;
    tiles.forEach(tile => {
      if (tile.colour && !currentCharacters.find(char => this.sameCoordinates(char.coordinate, tile.coordinate))) {
        const coordinate = this.getTileBoardCoordinate(tile.coordinate);
        ctx.fillStyle = tile.colour;
        ctx.fillRect(coordinate.x, coordinate.y, this.tileSize, this.tileSize);
      }
    });
  }

  private renderCharacters(ctx: CanvasRenderingContext2D) {
    const { currentCharacters, previousCharacters } = this.props.game;
    currentCharacters.forEach(character => {
      const prevCharacter = previousCharacters.find(previousCharacter => previousCharacter.id === character.id);
      this.renderCharacter(ctx, character, prevCharacter);
    });
  }

  private renderCharacter(ctx: CanvasRenderingContext2D, character: Character, prevCharacter?: Character) {
    let direction = Direction.UP;
    if (prevCharacter && !this.sameCoordinates(character.coordinate, prevCharacter.coordinate)) {
      direction = this.getDirection(character.coordinate, prevCharacter.coordinate);
      console.log(
        `${character.name} moves ${this.getDirectionName(direction)} (${prevCharacter.coordinate.x}, ${
          prevCharacter.coordinate.y
        }) -> (${character.coordinate.x}, ${character.coordinate.y})`,
      );
      this.renderCharacterPaint(ctx, character, direction);
    }
    const boardCoordinate = this.getCharacterBoardCoordinate(character.coordinate);
    ctx.fillStyle = character.colour;
    ctx.strokeStyle = 'black';
    ctx.beginPath();
    ctx.arc(boardCoordinate.x, boardCoordinate.y, this.tileSize / 2 - 2, 0, Math.PI * 2, true);
    ctx.fill();
    ctx.stroke();
  }

  private renderCharacterPaint(ctx: CanvasRenderingContext2D, character: Character, direction: Direction) {
    const boardCoordinate = this.getCharacterPaintBoardCoordinate(character.coordinate, direction);
    const startAngle = this.getPaintRotation(direction);
    ctx.fillStyle = character.colour;
    ctx.beginPath();
    ctx.arc(boardCoordinate.x, boardCoordinate.y, this.tileSize / 2, startAngle, startAngle + Math.PI, true);
    ctx.fill();
  }

  private sameCoordinates(c1: Coordinate, c2: Coordinate): boolean {
    return c1.x === c2.x && c1.y === c2.y;
  }
  /*
    private renderPowerUpsComponents() {
      const { powerUps, width } = this.props.game;
      return powerUps.map((powerUp, index) => {
        powerUp.coordinate = this.getTileBoardCoordinate(powerUp.coordinate);
        return (
          <PowerUpObject
            key={index}
            powerUp={powerUp}
            width={this.calculateTileSize(width)}
            height={this.calculateTileSize(width)}
          />
        );
      });
    }
  */

  private getCharacterBoardCoordinate(coordinate: Coordinate): Coordinate {
    return {
      x: coordinate.x * this.tileSize + this.tileSize / 2,
      y: coordinate.y * this.tileSize + this.tileSize / 2,
    };
  }

  private getCharacterPaintBoardCoordinate(coordinate: Coordinate, direction: Direction): Coordinate {
    let x = coordinate.x * this.tileSize;
    let y = coordinate.y * this.tileSize;
    switch (direction) {
      case Direction.DOWN:
        x += this.tileSize / 2;
        break;
      case Direction.UP:
        x += this.tileSize / 2;
        y += this.tileSize;
        break;
      case Direction.LEFT:
        y += this.tileSize / 2;
        x += this.tileSize;
        break;
      case Direction.RIGHT:
        y += this.tileSize / 2;
        break;
    }
    return { x, y };
  }

  private getTileBoardCoordinate(coordinate: Coordinate): Coordinate {
    return {
      x: coordinate.x * this.tileSize,
      y: coordinate.y * this.tileSize,
    };
  }

  private getPaperTiles() {
    const { width, height } = this.props.game;
    const allTiles = [];
    for (let x = 0; x < width; x++) {
      for (let y = 0; y < height; y++) {
        allTiles.push({ x, y });
      }
    }
    const colourTiles = Array.from(this.props.game.tiles.values());
    return allTiles.filter(
      tile => !colourTiles.find(colourTile => tile.x === colourTile.coordinate.x && tile.y === colourTile.coordinate.y),
    );
  }

  private calculateTileSize(width: number) {
    return Math.round(window.innerWidth / width / 1.7);
  }

  componentDidMount() {
    const canvas = this.canvasRef.current as HTMLCanvasElement;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      this.renderPaper(ctx);
      this.renderCharacters(ctx);
    }
  }

  componentDidUpdate() {
    const canvas = this.canvasRef.current as HTMLCanvasElement;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      this.renderTiles(ctx);
      this.renderCharacters(ctx);
    }
  }

  getDirectionName(direction: Direction) {
    switch (direction) {
      case Direction.DOWN:
        return 'down';
      case Direction.LEFT:
        return 'left';
      case Direction.UP:
        return 'up';
      case Direction.RIGHT:
        return 'right';
    }
  }

  getDirection(coordinate: Coordinate, prevCoordinate: Coordinate): Direction {
    if (coordinate.x > prevCoordinate.x) {
      return Direction.RIGHT;
    } else if (coordinate.x < prevCoordinate.x) {
      return Direction.LEFT;
    } else if (coordinate.y > prevCoordinate.y) {
      return Direction.DOWN;
    } else {
      return Direction.UP;
    }
  }

  getRotation(direction: Direction): number {
    switch (direction) {
      case Direction.DOWN:
        return 0;
      case Direction.LEFT:
        return Math.PI * 0.5;
      case Direction.UP:
        return Math.PI;
      case Direction.RIGHT:
        return Math.PI * 1.5;
    }
  }

  getPaintRotation(direction: Direction): number {
    switch (direction) {
      case Direction.UP:
        return 0;
      case Direction.RIGHT:
        return Math.PI * 0.5;
      case Direction.DOWN:
        return Math.PI;
      case Direction.LEFT:
        return Math.PI * 1.5;
    }
  }

  render() {
    return (
      <canvas ref={this.canvasRef} width={this.boardWidth} height={this.boardHeight}>
        Game
      </canvas>
    );
  }
}
