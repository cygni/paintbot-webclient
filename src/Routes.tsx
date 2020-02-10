import React, { ComponentProps, ComponentType } from 'react';
import { BrowserRouter, HashRouter, Route, Switch } from 'react-router-dom';

import AboutScreen from './about/AboutScreen';
import AccountScreen from './account/AccountScreen';
import ArenaScreen from './arena/ArenaScreen';
import TemplatePage from './common/ui/TemplatePage';
import TournamentScreen from './tournament/TournamentScreen';
import WelcomeScreen from './welcome/WelcomeScreen';

const LazyGameScreen = React.lazy(() => import(/* webpackPrefetch: true */ './game/GameScreen'));
const LazyPlayerScreen = React.lazy(() => import(/* webpackPrefetch: true */ './player/PlayerScreen'));

const Router: ComponentType<ComponentProps<typeof HashRouter> | ComponentProps<typeof BrowserRouter>> =
  process.env.REACT_APP_USE_HASH_ROUTER === 'true' ? HashRouter : BrowserRouter;

// React-Router needs te to figure out were the page is served.
// PUBLIC_URL gives us the absolute URL where the page is served, so the basename
// can be computed by resolving this URL relative to the current origin and extracting the pathname.
const { pathname: BASENAME } = new URL(process.env.PUBLIC_URL, window.location.origin);

export default function Routes() {
  return (
    <Router basename={BASENAME}>
      <React.Suspense fallback={null}>
        <Switch>
          <Route path="/" exact>
            <TemplatePage>
              <WelcomeScreen />
            </TemplatePage>
          </Route>
          <Route path="/account" exact>
            <TemplatePage>
              <AccountScreen />
            </TemplatePage>
          </Route>
          <Route path="/arena" exact>
            <TemplatePage>
              <ArenaScreen />
            </TemplatePage>
          </Route>
          <Route path="/about" exact>
            <TemplatePage>
              <AboutScreen />
            </TemplatePage>
          </Route>
          <Route path="/readme" exact>
            <TemplatePage />
          </Route>
          <Route path="/tournament" exact>
            <TemplatePage>
              <TournamentScreen />
            </TemplatePage>
          </Route>
          <Route path="/tournament/started" exact>
            <TemplatePage>
              <TournamentScreen />
            </TemplatePage>
          </Route>
          <Route path="/player/:name?">
            <LazyPlayerScreen />
          </Route>
          <Route path="/game/:id?">
            <LazyGameScreen />
          </Route>
        </Switch>
      </React.Suspense>
    </Router>
  );
}
