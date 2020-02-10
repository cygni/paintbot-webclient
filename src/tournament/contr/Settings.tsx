import React, { useContext } from 'react';
import styled from 'styled-components/macro';

import TournamentContext from '../../common/contexts/TournamentContext';
import { Paper, PaperList, PaperListItem, PaperTopic } from '../../common/ui/Paper';

export default function Settings() {
  const tour = useContext(TournamentContext);
  const gameSettings = tour.gameSettings;

  return (
    <Paper>
      <PaperTopic>Settings</PaperTopic>
      <PaperList>
        {Object.keys(gameSettings).map(k => (
          <FlexedPaperListItem key={k}>
            {<SettingName>{k}</SettingName>}
            {<span>{`${typeof gameSettings[k] === 'boolean' ? (gameSettings[k] ? '✔' : '-') : gameSettings[k]}`}</span>}
          </FlexedPaperListItem>
        ))}
      </PaperList>
    </Paper>
  );
}

const SettingName = styled.span`
  margin-right: 1rem;
`;

const FlexedPaperListItem = styled(PaperListItem)`
  display: flex;
  justify-content: space-between;
`;
