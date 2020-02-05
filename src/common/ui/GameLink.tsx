import React from 'react';

import { CharacterColors } from '../Constants';

import { LinkButton } from './DefaultButton';

export default function GameLink(props: any) {
  return (
    <LinkButton
      to={`/game/${encodeURIComponent(props.id)}`}
      backgroundColor={CharacterColors.Green}
      fontSize={14}
      marginTop="1em"
    >
      {props.children && props.children}
      {!props.children && props.id}
    </LinkButton>
  );
}
