import React from 'react';
import { Link } from 'react-router-dom';

export default function PlayerLink(props: any) {
  return <Link to={`/player/${encodeURIComponent(props.name)}`}>{props.name}</Link>;
}
