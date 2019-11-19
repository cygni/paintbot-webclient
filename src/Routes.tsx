import React, { ComponentProps, ComponentType, useContext, useEffect, useState } from 'react';
import { BrowserRouter, HashRouter, Route, Switch } from 'react-router-dom';

import AccountScreen from './account/AccountScreen';
import AccountContext from './common/contexts/AccountContext';
import ArenaContext from './common/contexts/ArenaContext';
import SettersContext from './common/contexts/SettersContext';
import TournamentContext, { isDifferent, setGamePlayed, validateTour } from './common/contexts/TournamentContext';
import TemplatePage from './common/TemplatePage';
import { Tournament } from './common/types';
import GamesScreen from './games/GamesScreen';
import TournamentScreen from './tournament/TournamentScreen';
import WelcomeScreen from './welcome/WelcomeScreen';

const LazyGameScreen = React.lazy(() => import(/* webpackPrefetch: true */ './game/GameScreen'));

const Router: ComponentType<ComponentProps<typeof HashRouter> | ComponentProps<typeof BrowserRouter>> =
  process.env.REACT_APP_USE_HASH_ROUTER === 'true' ? HashRouter : BrowserRouter;

// React-Router needs te to figure out were the page is served.
// PUBLIC_URL gives us the absolute URL where the page is served, so the basename
// can be computed by resolving this URL relative to the current origin and extracting the pathname.
const { pathname: BASENAME } = new URL(process.env.PUBLIC_URL, window.location.origin);

export default function Routes() {
  const [accContext, setAccContext] = useState(useContext(AccountContext));
  const [tourContext, setTourContext] = useState(useContext(TournamentContext));
  const [arenaContext, setArenaContext] = useState(useContext(ArenaContext));
  const [settersContext, setSettersContext] = useState(useContext(SettersContext));

  useEffect(
    () => {
      const tourSetter = (tournament: any, currentContext: Tournament, messType: string) => {
        const newTour: Tournament = validateTour(tournament, currentContext, messType);
        if (isDifferent(newTour, currentContext)) {
          setTourContext(newTour);
        }
      };

      const setTourGamePlayed = (gameId: string, isPlayed: boolean) => {
        const newTour = setGamePlayed(gameId, tourContext, isPlayed);
        setTourContext(newTour);
      };

      const accSetter = (li: boolean, un: string, t: string) => {
        setAccContext({
          loggedIn: li,
          username: un,
          token: t,
        });
      };

      setSettersContext({
        setTournament: tourSetter,
        setAcc: accSetter,
        setTourGamePlayed,
      });
    },
    [tourContext],
  );

  return (
    <Router basename={BASENAME}>
      <React.Suspense fallback={null}>
        <Switch>
          <SettersContext.Provider value={settersContext}>
            <AccountContext.Provider value={accContext}>
              <TournamentContext.Provider value={tourContext}>
                <ArenaContext.Provider value={arenaContext}>
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
                  <Route path="/games" exact>
                    <TemplatePage>
                      <GamesScreen setArena={setArenaContext} />
                    </TemplatePage>
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
                  <Route path="/game/:id?">
                    <LazyGameScreen />
                  </Route>
                </ArenaContext.Provider>
              </TournamentContext.Provider>
            </AccountContext.Provider>
          </SettersContext.Provider>
        </Switch>
      </React.Suspense>
    </Router>
  );
}
