import React from 'react';

import ArenaForm from './ArenaForm';

export default function GamesScreen(props: any) {
  return (
    <div>
      <h1>Active games</h1>
      <ArenaForm {...props} />
    </div>
  );
}
