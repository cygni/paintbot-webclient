import Konva from 'konva';
import React from 'react';
import { Circle, Group, Star } from 'react-konva';

import { CharacterColors } from '../../../common/Constants';
import { Coordinate } from '../../type';

interface Props {
  key: number;
  colour: string;
  coordinate: Coordinate;
  width: number;
  height: number;
  playerId: string;
  previousCoordinate: Coordinate;
  carryingPowerUp: boolean;
  stunned: boolean;
}

export default class PlayerCharacter extends React.Component<Props> {
  private readonly characterRef = React.createRef<Konva.Group>();

  componentDidMount() {
    this.characterRef.current!.transformsEnabled('position');
  }

  componentWillUnmount() {
    this.characterRef.current!.destroy();
  }

  componentDidUpdate() {
    this.animate();
    this.characterRef.current!.cache();
  }

  shouldComponentUpdate(nextProps: Props) {
    return this.props.coordinate.x !== nextProps.coordinate.x || this.props.coordinate.y !== nextProps.coordinate.y;
  }

  animate() {
    this.characterRef.current!.to({
      x: this.props.coordinate.x,
      y: this.props.coordinate.y,
      duration: 0.25,
      easing: Konva.Easings.EaseInOut,
    });
  }

  getRotation() {
    let angle = 0;

    if (this.props.coordinate.x > this.props.previousCoordinate.x) {
      angle = 90;
    } else if (this.props.coordinate.x < this.props.previousCoordinate.x) {
      angle = 270;
    } else if (this.props.coordinate.y > this.props.previousCoordinate.y) {
      angle = 180;
    }

    return angle;
  }

  render() {
    return (
      <Group
        x={this.props.previousCoordinate.x}
        y={this.props.previousCoordinate.y}
        width={this.props.width}
        height={this.props.height}
        listening={false}
        ref={this.characterRef}
      >
        {this.props.carryingPowerUp ? this.renderUltimate() : this.renderNormal()}
        {this.props.stunned && this.renderStars()}
      </Group>
    );
  }

  renderNormal() {
    return (
      <>
        <Circle // base
          perfectDrawEnabled={false}
          x={this.props.width / 2}
          y={this.props.height / 2}
          radius={this.props.width / 2}
          fill={this.props.colour}
          stroke={CharacterColors.Stroke}
          strokeWidth={1}
        />
        <Circle // left eye
          perfectDrawEnabled={false}
          x={this.props.width / 2}
          y={this.props.height / 2}
          offsetX={this.props.width / 4}
          offsetY={this.props.height / 4}
          radius={this.props.width / 16}
          fill={CharacterColors.Stroke}
          rotation={this.getRotation()}
        />
        <Circle // right eye
          perfectDrawEnabled={false}
          x={this.props.width / 2}
          y={this.props.height / 2}
          offsetX={-this.props.width / 4}
          offsetY={this.props.height / 4}
          radius={this.props.width / 16}
          fill={CharacterColors.Stroke}
          rotation={this.getRotation()}
        />
        <Circle // shadow spot
          perfectDrawEnabled={false}
          x={this.props.width / 2}
          y={this.props.height / 2}
          offsetY={(-this.props.height * 3) / 8}
          radius={this.props.width / 6}
          fill={'rgba(0,0,0,0.3)'}
          rotation={this.getRotation()}
        />
        <Circle // normal color overlaying shadow spot
          perfectDrawEnabled={false}
          x={this.props.width / 2}
          y={this.props.height / 2}
          offsetY={(-this.props.height * 2) / 8}
          radius={this.props.width / 6}
          fill={this.props.colour}
          rotation={this.getRotation()}
        />
        <Circle // big shine
          perfectDrawEnabled={false}
          x={this.props.width / 2}
          y={this.props.height / 2}
          offsetY={(-this.props.height * 3) / 8}
          radius={this.props.width / 16}
          fill={'#fff'}
          rotation={this.getRotation()}
        />
        <Circle // little shine
          perfectDrawEnabled={false}
          x={this.props.width / 2}
          y={this.props.height / 2}
          offsetY={(-this.props.height * 2) / 8}
          radius={this.props.width / 24}
          fill={'#fff'}
          rotation={this.getRotation()}
        />
      </>
    );
  }

  renderUltiBlobs() {
    const ultiBlobs = [];

    for (let i = 0; i < 6; i++) {
      const ultiBlob = this.renderUltiBlob(`ultiblob${i}`);
      ultiBlobs.push(ultiBlob);
    }

    return ultiBlobs;
  }

  renderUltiBlob(key: string) {
    return (
      <Circle
        key={key}
        perfectDrawEnabled={false}
        x={this.props.width / 2}
        y={this.props.height / 2}
        offsetX={this.props.width / 4}
        offsetY={this.props.height / 4}
        radius={this.props.width / (3 + Math.random() * 4)}
        fill={this.props.colour}
        stroke={CharacterColors.Stroke}
        strokeWidth={1}
        rotation={Math.random() * 360}
      />
    );
  }

  renderUltimate() {
    return (
      <>
        <Circle // base
          perfectDrawEnabled={false}
          x={this.props.width / 2}
          y={this.props.height / 2}
          radius={this.props.width / 2}
          fill={this.props.colour}
          stroke={CharacterColors.Stroke}
          strokeWidth={1}
        />
        {this.renderUltiBlobs()}
        <Circle // base overlay
          perfectDrawEnabled={false}
          x={this.props.width / 2}
          y={this.props.height / 2}
          radius={(this.props.width * 7) / 16}
          fill={this.props.colour}
        />
        <Circle // left eye
          perfectDrawEnabled={false}
          x={this.props.width / 2}
          y={this.props.height / 2}
          offsetX={this.props.width / 4}
          offsetY={this.props.height / 4}
          radius={this.props.width / 16}
          fill={CharacterColors.Stroke}
          rotation={this.getRotation()}
        />
        <Circle // right eye
          perfectDrawEnabled={false}
          x={this.props.width / 2}
          y={this.props.height / 2}
          offsetX={-this.props.width / 4}
          offsetY={this.props.height / 4}
          radius={this.props.width / 16}
          fill={CharacterColors.Stroke}
          rotation={this.getRotation()}
        />
        <Circle // shadow spot
          perfectDrawEnabled={false}
          x={this.props.width / 2}
          y={this.props.height / 2}
          offsetY={(-this.props.height * 3) / 8}
          radius={this.props.width / 6}
          fill={'rgba(0,0,0,0.3)'}
          rotation={this.getRotation()}
        />
        <Circle // normal color overlaying shadow spot
          perfectDrawEnabled={false}
          x={this.props.width / 2}
          y={this.props.height / 2}
          offsetY={(-this.props.height * 2) / 8}
          radius={this.props.width / 6}
          fill={this.props.colour}
          rotation={this.getRotation()}
        />
        <Circle // big shine
          perfectDrawEnabled={false}
          x={this.props.width / 2}
          y={this.props.height / 2}
          offsetY={(-this.props.height * 3) / 8}
          radius={this.props.width / 16}
          fill={'#fff'}
          rotation={this.getRotation()}
        />
        <Circle // little shine
          perfectDrawEnabled={false}
          x={this.props.width / 2}
          y={this.props.height / 2}
          offsetY={(-this.props.height * 2) / 8}
          radius={this.props.width / 24}
          fill={'#fff'}
          rotation={this.getRotation()}
        />
      </>
    );
  }

  renderStars() {
    const stars = [];

    for (let i = 0; i < 2; i++) {
      const star = this.renderStar(`star${i}`);
      stars.push(star);
    }

    return stars;
  }

  renderStar(key: string) {
    const outerRadius = this.props.width / (4 + Math.random() * 8);
    const innerRadius = outerRadius / 2;

    return (
      <Star
        key={key}
        perfectDrawEnabled={false}
        numPoints={5}
        x={this.props.width / 2}
        y={this.props.height / 2}
        offsetX={(Math.random() * this.props.width) / 2 - this.props.width / 4}
        offsetY={(Math.random() * this.props.height) / 2 - this.props.height / 4}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        fill={'#fff'}
        stroke={CharacterColors.Stroke}
        strokeWidth={1}
      />
    );
  }
}
