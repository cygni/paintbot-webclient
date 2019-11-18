import React, { useContext } from 'react';

import SettersContext from '../common/contexts/SettersContext';

export default function LogoutForm(props: any) {
  const setters = useContext(SettersContext);
  const logOut = () => {
    setters.setAcc(false, '', '');
  };
  return <button onClick={logOut}>Log out</button>;
}
