import React from 'react';
import { Layer, Stage } from 'react-konva';
import styled from 'styled-components';

import { GameBoardConstants } from '../../common/Constants';
import { Coordinate, Game } from '../type';

import PlayerCharacter from './gameobject/PlayerCharacter';
import PowerUpObject from './gameobject/PowerUpObject';
import ColouredTile from './tile/ColouredTile';

interface Props {
  game: Game;
}

const Container = styled.div`
  border: ${GameBoardConstants.Border};
  box-shadow: ${GameBoardConstants.BoxShadow};
  background-color: ${GameBoardConstants.BackgroundColor};
`;

export default class GameBoardContainer extends React.Component<Props> {
  private readonly boardWidth: number;
  private readonly boardHeight: number;

  constructor(props: Props) {
    super(props);
    const { width, height } = this.props.game;
    this.boardWidth = width * this.calculateTileSize(width);
    this.boardHeight = height * this.calculateTileSize(width);
  }

  private renderTileComponents() {
    const { width } = this.props.game;
    const tiles = Array.from(this.props.game.tiles.values());
    return tiles.map((tile, index) => {
      tile.coordinate = this.getBoardCoordinate(tile.coordinate);
      return (
        <ColouredTile
          key={index}
          coordinate={tile.coordinate}
          colour={tile.colour}
          width={this.calculateTileSize(width)}
          height={this.calculateTileSize(width)}
        />
      );
    });
  }

  private renderCharacterComponents() {
    const { currentCharacters, previousCharacters, width } = this.props.game;
    return currentCharacters.map((character, index) => {
      character.coordinate = this.getBoardCoordinate(character.coordinate);
      const previousCharacter = previousCharacters.filter(c => c.id === character.id)[0];
      const previousCharacterCoordinate = previousCharacter ? previousCharacter.coordinate : character.coordinate;
      return (
        <PlayerCharacter
          key={index}
          colour={character.colour}
          coordinate={character.coordinate}
          width={this.calculateTileSize(width)}
          height={this.calculateTileSize(width)}
          playerId={character.id}
          previousCoordinate={previousCharacterCoordinate}
          carryingPowerUp={character.carryingPowerUp}
          stunned={character.stunned}
        />
      );
    });
  }

  private renderPowerUpsComponents() {
    const { powerUps, width } = this.props.game;
    return powerUps.map((powerUp, index) => {
      powerUp.coordinate = this.getBoardCoordinate(powerUp.coordinate);
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

  private getBoardCoordinate(coordinate: Coordinate): Coordinate {
    const { width } = this.props.game;
    const boardCoordinate: Coordinate = { x: 0, y: 0 };
    boardCoordinate.x = coordinate.x * this.calculateTileSize(width);
    boardCoordinate.y = coordinate.y * this.calculateTileSize(width);
    return boardCoordinate;
  }

  private calculateTileSize(width: number) {
    return window.innerWidth / width / 1.7;
  }

  render() {
    return (
      <Container>
        <Stage className={'stage'} width={this.boardWidth} height={this.boardHeight} listening={false}>
          <Layer hitGraphEnabled={false} listening={false}>
            {this.renderTileComponents()}
            {this.renderCharacterComponents()}
            {this.renderPowerUpsComponents()}
          </Layer>
        </Stage>
      </Container>
    );
  }
}
