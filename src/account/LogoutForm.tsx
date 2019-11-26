import React, { useContext } from 'react';

import SettersContext from '../common/contexts/SettersContext';
import { docCookies } from '../common/util';

export default function LogoutForm(props: any) {
  const setters = useContext(SettersContext);
  const logOut = () => {
    setters.setAcc(false, '', '');

    if (docCookies.removeItem('token')) {
      console.log('removed token cookie');
    } else {
      console.log('could not remove token cookie');
    }

    if (docCookies.removeItem('name')) {
      console.log('removed name cookie');
    } else {
      console.log('could not remove name cookie');
    }
  };
  return <button onClick={logOut}>Log out</button>;
}
