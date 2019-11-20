import React, { useContext, useEffect, useState } from 'react';

import { WebSocketProvider } from './common/API';
import AccountContext from './common/contexts/AccountContext';
import ArenaContext from './common/contexts/ArenaContext';
import SettersContext from './common/contexts/SettersContext';
import TournamentContext, { setGamePlayed, validateTour } from './common/contexts/TournamentContext';
import { Arena, Tournament } from './common/types';
import { isDifferent } from './common/util';
import Routes from './Routes';

export default function App() {
  const [accContext, setAccContext] = useState(useContext(AccountContext));
  const [tourContext, setTourContext] = useState(useContext(TournamentContext));
  const [arenaContext, setArenaContext] = useState(useContext(ArenaContext));
  const [setters, setSetters] = useState(useContext(SettersContext));

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
      const setArena = (arena: Arena) => {
        setArenaContext(arena);
      };
      const settersToBeUSed = {
        forceSetTournament: setTourContext,
        setTournament: tourSetter,
        setAcc: accSetter,
        setTourGamePlayed,
        setArena,
        settersHasBeenSet: true,
      };
      setSetters(settersToBeUSed);
    },
    [tourContext],
  );

  return (
    <SettersContext.Provider value={setters}>
      <AccountContext.Provider value={accContext}>
        <TournamentContext.Provider value={tourContext}>
          <ArenaContext.Provider value={arenaContext}>
            <WebSocketProvider>
              <Routes />
            </WebSocketProvider>
          </ArenaContext.Provider>
        </TournamentContext.Provider>
      </AccountContext.Provider>
    </SettersContext.Provider>
  );
}
