import React from 'react';

import { CharacterColors } from '../Constants';

import { DefaultLink } from './DefaultLink';

export default function PlayerLink(props: any) {
  return (
    <DefaultLink
      className={props.className}
      to={`/search?q=${encodeURIComponent(props.name)}`}
      color={CharacterColors.Navy}
    >
      {props.name}
    </DefaultLink>
  );
}
