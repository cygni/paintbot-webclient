import React from 'react';

import { CharacterColors } from '../Constants';

import { LinkButton } from './DefaultButton';

export default function PlayerLink(props: any) {
  return (
    <LinkButton
      className={props.className}
      to={`/player/${encodeURIComponent(props.name)}`}
      backgroundColor={CharacterColors.Blue}
    >
      {props.name}
    </LinkButton>
  );
}
