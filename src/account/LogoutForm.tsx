import React, { useContext } from 'react';

import AccountContext from '../common/contexts/AccountContext';
import SettersContext from '../common/contexts/SettersContext';
import ControlsButton from '../common/ui/ControlsButton';
import { docCookies } from '../common/util';

export default function LogoutForm(props: any) {
  const setters = useContext(SettersContext);
  const acc = useContext(AccountContext);
  const logOut = () => {
    if (docCookies.removeItem('token') && docCookies.removeItem('name')) {
      setters.setAcc(false, '', '');
    } else {
      docCookies.setItem('token', acc.token);
      docCookies.setItem('name', acc.username);
    }
  };
  return <ControlsButton onClick={logOut}>Log out</ControlsButton>;
}
