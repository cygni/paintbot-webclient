import React from 'react';
import { BrowserRouter, HashRouter, Redirect, Route, Switch } from 'react-router-dom';

import WelcomeScreen from './welcome/WelcomeScreen';

const LazyGameScreen = React.lazy(() => import(/* webpackPrefetch: true */ './game/GameScreen'));

const Router = process.env.REACT_APP_USE_HASH_ROUTER === 'true' ? HashRouter : BrowserRouter;

const GoHome = () => <Redirect to="/" />;

// React-Router needs te to figure out were the page is served.
// PUBLIC_URL gives us the absolute URL where the page is served, so the basename
// can be computed by resolving this URL relative to the current origin and extracting the pathname.
const { pathname: BASENAME } = new URL(process.env.PUBLIC_URL, location.origin);

export default function Routes() {
  return (
    <Router basename={BASENAME}>
      <React.Suspense fallback={null}>
        <Switch>
          <Route path="/" exact component={WelcomeScreen} />
          <Route path="/game" component={LazyGameScreen} />
          <Route component={GoHome} />
        </Switch>
      </React.Suspense>
    </Router>
  );
}
