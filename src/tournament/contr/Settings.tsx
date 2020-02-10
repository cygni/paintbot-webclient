import React, { useContext } from 'react';
import styled from 'styled-components/macro';

import TournamentContext from '../../common/contexts/TournamentContext';
import { Paper, PaperTopic } from '../../common/ui/Paper';

export default function Settings() {
  const tour = useContext(TournamentContext);
  const gameSettings = tour.gameSettings;

  return (
    <Paper>
      <PaperTopic>Settings</PaperTopic>
      <PaperList id="game-settings">
        {Object.keys(gameSettings).map(k => (
          <li key={k}>
            {<SettingName>{k}</SettingName>}
            {<span>{`${typeof gameSettings[k] === 'boolean' ? (gameSettings[k] ? '✔' : '-') : gameSettings[k]}`}</span>}
          </li>
        ))}
      </PaperList>
    </Paper>
  );
}

const SettingName = styled.span`
  margin-right: 1rem;
`;

const PaperList = styled.ul`
  width: 100%;
  margin: 1rem 0 0;
  padding-inline-start: 0px;
  li {
    margin-bottom: 0px;
    display: flex;
    justify-content: space-between;
    padding: 0.5rem 1.5rem;
    border-bottom: 1px solid aliceblue;
  }
`;
