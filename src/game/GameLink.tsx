import React from 'react';

import { CharacterColors } from '../common/Constants';
import { LinkButton } from '../common/ui/DefaultButton';

export default function GameLink(props: any) {
  return (
    <LinkButton to={`/game/${encodeURIComponent(props.id)}`} backgroundColor={CharacterColors.GreenCharacter}>
      {props.children && props.children}
      {!props.children && props.id}
    </LinkButton>
  );
}
