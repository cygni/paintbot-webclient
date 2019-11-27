import React, { useContext, useState } from 'react';
import styled from 'styled-components/macro';

import TournamentContext from '../../common/contexts/TournamentContext';
import ControlsButton from '../../common/ui/ControlsButton';
import ScrollableViewport from '../../common/ui/ScrollableViewport';

export default function Settings({ className }: { className: string }) {
  const tour = useContext(TournamentContext);
  const gameSettings = tour.gameSettings;
  const [showProps, setShowProps] = useState(false);

  const oc = (event: any) => {
    event.preventDefault();
    setShowProps(!showProps);
  };

  return (
    <FlexColumn className={className}>
      <h2>Game settings</h2>
      <ControlsButton onClick={oc}>{showProps ? 'Hide' : 'Show'} settings</ControlsButton>
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
