import React, { useContext, useState } from 'react';
import styled from 'styled-components/macro';

import AccountContext from '../../common/contexts/AccountContext';
import TournamentContext from '../../common/contexts/TournamentContext';
import ControlsButton from '../../common/ui/ControlsButton';
import ScrollableViewport from '../../common/ui/ScrollableViewport';

export default function Settings({ className }: { className: string }) {
  const acc = useContext(AccountContext);
  const tour = useContext(TournamentContext);
  const gameSettings = tour.gameSettings;
  const [showProps, setShowProps] = useState(acc.loggedIn);
  const levels = tour.gamePlan.tournamentLevels;
  const showHead = !acc.loggedIn || (levels.length > 0 && levels[0].tournamentGames[0].gameId !== null);

  const oc = (event: any) => {
    event.preventDefault();
    setShowProps(!showProps);
  };

  return (
    <FlexColumn className={className}>
      {showHead && <h2>Game settings</h2>}
      {showHead && <ControlsButton onClick={oc}>{showProps ? 'Hide' : 'Show'} settings</ControlsButton>}
      {showProps && (
        <ul id="game-settings">
          <ScrollableViewport>
            {Object.keys(gameSettings).map(k => (
              <li key={k}>
                {<p>{k.toUpperCase()}</p>}
                {<p>{`${gameSettings[k]}`}</p>}
              </li>
            ))}
          </ScrollableViewport>
        </ul>
      )}
    </FlexColumn>
  );
}

const FlexColumn = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  & ul li {
    margin-bottom: 0px;
  }
  & * {
    align-self: center;
  }
`;
