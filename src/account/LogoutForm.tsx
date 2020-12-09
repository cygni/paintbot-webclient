import React, { useContext } from 'react';

import AccountContext from '../common/contexts/AccountContext';
import SettersContext from '../common/contexts/SettersContext';
import DefaultButton from '../common/ui/DefaultButton';
import { PaperRow } from '../common/ui/Paper';
import { docCookies } from '../common/util';

export default function LogoutForm() {
  const setters = useContext(SettersContext);
  const acc = useContext(AccountContext);

  function logOut() {
    if (docCookies.removeItem('token') && docCookies.removeItem('name')) {
      setters.setAcc(false, '', '');
    } else {
      docCookies.setItem('token', acc.token);
      docCookies.setItem('name', acc.username);
    }
  }

  return (
    <>
      <PaperRow>You are logged in</PaperRow>
      <PaperRow>
        <DefaultButton onClick={logOut} width="100%">
          Log out
        </DefaultButton>
      </PaperRow>
    </>
  );
}
