import React, { useContext } from 'react';

import AccountContext from '../common/contexts/AccountContext';
import SettersContext from '../common/contexts/SettersContext';
import ControlsButton from '../common/ui/ControlsButton';
import { PaperRow } from '../common/ui/Paper';
import { docCookies } from '../common/util';

export default function LogoutForm() {
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
  return (
    <PaperRow textAlign="center">
      <ControlsButton onClick={logOut}>Log out</ControlsButton>
    </PaperRow>
  );
}
