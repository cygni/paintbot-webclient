import React from 'react';
import FlipMove from 'react-flip-move';

import { Indent } from '../../common/ui/Indent';
import { Character } from '../type';

import ScoreBoardEntry from './ScoreBoardEntry';
import { SortOrder, sortPlayers } from './Util';

interface Props {
  players: Character[];
  worldTick?: number;
}

export default class ScoreBoardContainer extends React.Component<Props> {
  private getPlayers() {
    const sortedPlayers = sortPlayers(this.props.players, SortOrder.DESCENDING);
    return sortedPlayers.map(player => {
      return <ScoreBoardEntry key={player.id} player={player} />;
    });
  }
  shouldComponentUpdate(nextProps: Props) {
    return !!nextProps.worldTick && (nextProps.worldTick % 5 === 0 || nextProps.worldTick === 1);
  }

  render() {
    return (
      <Indent>
        <FlipMove>{this.getPlayers()}</FlipMove>
      </Indent>
    );
  }
}
