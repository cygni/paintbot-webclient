import React from 'react';

const AccountContext = React.createContext({
  loggedIn: false,
  username: '',
  token: '',
});

export default AccountContext;
