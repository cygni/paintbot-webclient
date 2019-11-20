import React, { useContext } from 'react';

import AccountContext from '../common/contexts/AccountContext';
import ArenaContext from '../common/contexts/ArenaContext';

import ArenaForm from './ArenaForm';

export default function ArenaScreen() {
  const accContext = useContext(AccountContext);
  return (
    <div>
      <ArenaViewer />
      {accContext.loggedIn && <ArenaForm />}
    </div>
  );
}

function ArenaViewer() {
  const arenaContext = useContext(ArenaContext);

  return (
    <>
      <h1>{arenaContext.currentArena}</h1>
    </>
  );
}
