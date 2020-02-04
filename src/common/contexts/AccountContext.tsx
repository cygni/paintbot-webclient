import React from 'react';

import { Account } from '../types';

export const defaultAccount: Account = {
  loggedIn: false,
  username: '',
  token: '',
};

const AccountContext = React.createContext({
  loggedIn: false,
  username: '',
  token: '',
});

export default AccountContext;
