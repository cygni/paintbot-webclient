import React, { useContext } from 'react';

import AccountContext from '../common/contexts/AccountContext';
import { Paper } from '../common/ui/Paper';

import LoginForm from './LoginForm';
import LogoutForm from './LogoutForm';

export default function AccountScreen() {
  const accContext = useContext(AccountContext);

  return <Paper>{accContext.loggedIn ? <LogoutForm /> : <LoginForm />}</Paper>;
}
