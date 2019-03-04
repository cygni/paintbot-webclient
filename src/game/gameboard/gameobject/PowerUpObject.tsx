import Konva from 'konva';
import React from 'react';
import { Image as KonvaImage } from 'react-konva';

import { PowerUp } from '../../type';

interface Props {
  powerUp: PowerUp;
  width: number;
  height: number;
}

export default class PowerUpObject extends React.Component<Props> {
  private readonly image = new Image();
  private readonly powerUpRef = React.createRef<Konva.Image>();

  shouldComponentUpdate(nextProps: Props) {
    return (
      nextProps.powerUp.coordinate.x !== this.props.powerUp.coordinate.x ||
      nextProps.powerUp.coordinate.y !== this.props.powerUp.coordinate.y
    );
  }

  componentDidMount() {
    this.image.src = this.props.powerUp.image;
  }

  componentWillUnmount() {
    this.powerUpRef.current!.destroy();
  }

  render() {
    const { powerUp, width, height } = this.props;
    return (
      <KonvaImage
        image={this.image}
        x={powerUp.coordinate.x}
        y={powerUp.coordinate.y}
        width={width}
        height={height}
        perfectDrawEnabled={false}
        listening={false}
        ref={this.powerUpRef}
      />
    );
  }
}
