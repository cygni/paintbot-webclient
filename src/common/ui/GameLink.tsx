import React from 'react';

import { DefaultLink } from './DefaultLink';

export default function GameLink(props: any) {
  return (
    <DefaultLink to={`/game/${encodeURIComponent(props.id)}`}>
      {props.children && props.children}
      {!props.children && props.id}
    </DefaultLink>
  );
}
