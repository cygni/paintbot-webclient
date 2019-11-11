import React from 'react';

import { defaultTournament } from '../common/Contexts';

export default function LogoutForm(props: any) {
  const logOut = () => {
    props.setLoggedIn(false);
    props.setTournament(defaultTournament);
  };
  return <button onClick={logOut}>Log out</button>;
}
