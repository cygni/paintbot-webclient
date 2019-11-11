import React, { ComponentProps, ComponentType, useState } from 'react';
import { BrowserRouter, HashRouter, Route, Switch /*, Redirect*/ } from 'react-router-dom';

import AccountScreen from './account/AccountScreen';
import AccountContext from './common/AccountContext';
import Header from './common/Header';
import WelcomeScreen from './welcome/WelcomeScreen';

const LazyGameScreen = React.lazy(() => import(/* webpackPrefetch: true */ './game/GameScreen'));
// const LazyAccountScreen = React.lazy(() => import(/* webpackPrefetch: true */ './account/AccountScreen'));
// const LazyTournamentScreen = React.lazy(() => import(/* webpackPrefetch: true */ './tournament/TournamentScreen'));

const Router: ComponentType<ComponentProps<typeof HashRouter> | ComponentProps<typeof BrowserRouter>> =
  process.env.REACT_APP_USE_HASH_ROUTER === 'true' ? HashRouter : BrowserRouter;

// React-Router needs te to figure out were the page is served.
// PUBLIC_URL gives us the absolute URL where the page is served, so the basename
// can be computed by resolving this URL relative to the current origin and extracting the pathname.
const { pathname: BASENAME } = new URL(process.env.PUBLIC_URL, window.location.origin);

export default function Routes() {
  const [accContext, setAccContext] = useState({
    loggedIn: false,
    username: '',
    token: '',
  });
  const header = <Header />;
  const setter = (li: boolean, un: string, t: string) => {
    setAccContext({
      loggedIn: li,
      username: un,
      token: t,
    });
  };
  return (
    <Router basename={BASENAME}>
      <React.Suspense fallback={null}>
        <Switch>
          <Route path="/" exact>
            <AccountContext.Provider value={accContext}>
              <WelcomeScreen header={header} />
            </AccountContext.Provider>
          </Route>
          <Route path="/account" exact>
            <AccountContext.Provider value={accContext}>
              <AccountScreen header={header} setLoggedIn={setter} />
            </AccountContext.Provider>
          </Route>
          {/*<PrivateRoute path="/tournament">
            <LazyTournamentScreen />
  </PrivateRoute>*/}
          <Route path="/game/:id?">
            <LazyGameScreen />
          </Route>
        </Switch>
      </React.Suspense>
    </Router>
  );
}
/*
function PrivateRoute({ children, ...rest }) {
  return (
    <Route
      {...rest}
      render={({ location }) =>
        true ? (
          children
        ) : (
            <Redirect
              to={{
                pathname: "/account",
                state: { from: location }
              }}
            />
          )
      }
    />
  );
}
*/
