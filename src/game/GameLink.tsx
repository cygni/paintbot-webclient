import React from 'react';
import { Link } from 'react-router-dom';

export default function GameLink(props: any) {
  return (
    <Link to={`/game/${encodeURIComponent(props.id)}`}>
      {props.children && props.children}
      {!props.children && props.id}
    </Link>
  );
}
