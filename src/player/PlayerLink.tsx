import React from 'react';

import { CharacterColors } from '../common/Constants';
import { LinkButton } from '../common/ui/DefaultButton';

export default function PlayerLink(props: any) {
  return (
    <LinkButton
      className={props.className}
      to={`/player/${encodeURIComponent(props.name)}`}
      backgroundColor={CharacterColors.BlueCharacter}
    >
      {props.name}
    </LinkButton>
  );
}
