import React, { useContext } from 'react';
import styled from 'styled-components/macro';

import TournamentContext from '../../common/contexts/TournamentContext';
import { Paper, PaperHeading } from '../../common/ui/Paper';

export default function Settings({ className }: { className: string }) {
  const tour = useContext(TournamentContext);
  const gameSettings = tour.gameSettings;

  return (
    <Paper className={className}>
      <PaperHeading>Settings</PaperHeading>
      <PaperList id="game-settings">
        {Object.keys(gameSettings).map(k => (
          <li key={k}>
            {<Setting>{k}</Setting>}
            {
              <Setting>
                {`${typeof gameSettings[k] === 'boolean' ? (gameSettings[k] ? '✔' : '-') : gameSettings[k]}`}
              </Setting>
            }
          </li>
        ))}
      </PaperList>
    </Paper>
  );
}

const Setting = styled.span`
  margin-top: 1em;
`;

const PaperList = styled.ul`
  width: 100%;
  margin: 0px;
  li {
    margin-bottom: 0px;
    display: flex;
    justify-content: space-between;
    padding: 0 1rem;
    border-bottom: 1px solid aliceblue;
  }
`;