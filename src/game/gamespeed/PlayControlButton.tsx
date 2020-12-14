import React from 'react';

import DefaultButton from '../../common/ui/DefaultButton';

export interface PlayControlButtonProps {
  playing: boolean;
  onClick: React.ComponentProps<typeof DefaultButton>['onClick'];
}

export const PlayControlButton = ({ playing, onClick }: PlayControlButtonProps) => {
  const playStatusText = playing ? 'Pause' : 'Play';
  return (
    <DefaultButton onClick={onClick} width={200}>
      {playStatusText}
    </DefaultButton>
  );
};
