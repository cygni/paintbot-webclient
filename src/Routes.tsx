import React, { ComponentProps, ComponentType, useContext, useState } from 'react';
import { BrowserRouter, HashRouter, Route, Switch /*, Redirect*/ } from 'react-router-dom';

import AccountScreen from './account/AccountScreen';
import { AccountContext, TournamentContext, validateTour } from './common/Contexts';
import TemplatePage from './common/TemplatePage';
import GamesScreen from './games/GamesScreen';
import TournamentScreen from './tournament/TournamentScreen';
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
  const [accContext, setAccContext] = useState(useContext(AccountContext));
  const [tourContext, setTourContext] = useState(useContext(TournamentContext));

  const tourSetter = (tournament: any, currentContext: any, messType: string) => {
    const newTour = validateTour(tournament, currentContext, messType);
    setTourContext(newTour);
  };

  const accSetter = (li: boolean, un: string, t: string) => {
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
          <AccountContext.Provider value={accContext}>
            <TournamentContext.Provider value={tourContext}>
              <Route path="/" exact>
                <TemplatePage>
                  <WelcomeScreen />
                </TemplatePage>
              </Route>
              <Route path="/account" exact>
                <TemplatePage>
                  <AccountScreen setLoggedIn={accSetter} setTournament={tourSetter} />
                </TemplatePage>
              </Route>
              <Route path="/games" exact>
                <TemplatePage>
                  <GamesScreen />
                </TemplatePage>
              </Route>
              <Route path="/tournament">
                <TemplatePage>
                  <TournamentScreen setTournament={tourSetter} />
                </TemplatePage>
              </Route>
              <Route path="/game/:id?">
                <LazyGameScreen />
              </Route>
            </TournamentContext.Provider>
          </AccountContext.Provider>
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
