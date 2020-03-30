import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import styled from 'styled-components/macro';

import { useRestAPIToGetGamesPlayedByPlayer } from '../common/API';
import { HistoricGame, PlayerHistory } from '../common/types';
import GameLink from '../common/ui/GameLink';
import { Heading1 } from '../common/ui/Heading';
import { Paper, PaperRow } from '../common/ui/Paper';
import TemplatePage from '../common/ui/TemplatePage';
import { isDifferent } from '../common/util';

export default function PlayerScreen(props: any) {
  const { name } = useParams<{ name: string }>();
  const decodedName = decodeURIComponent(name);
  const query = useRestAPIToGetGamesPlayedByPlayer(name);
  const [games, setGames] = useState({ items: new Array<HistoricGame>() });
  const [shouldSetUp, setShouldSetUp] = useState(true);

  useEffect(
    () => {
      let interval: NodeJS.Timeout;
      const update = () => {
        query((initialResult: PlayerHistory) => {
          if (isDifferent(initialResult, games)) {
            setGames(initialResult);
          }
        });
      };
      if (shouldSetUp) {
        update();
        setShouldSetUp(false);
      }
      interval = setInterval(update, 10000);
      return () => clearInterval(interval);
    },
    [query, games, shouldSetUp],
  );

  query(console.log);

  return (
    <TemplatePage>
      <Paper>
        <PaperRow>
          <Heading1>Player: {decodedName}</Heading1>
        </PaperRow>
        {games.items.length > 0 && <h2>Played games</h2>}
        {games.items.length > 0 && (
          <FlexColumn>
            {games.items
              .sort((a, b) => b.gameDate.localeCompare(a.gameDate))
              .map(game => (
                <GameLink key={game.gameId} id={game.gameId}>
                  {game.gameDate}
                </GameLink>
              ))}
          </FlexColumn>
        )}
        {games.items.length < 1 && <h2>{decodedName} has not played any games yet!</h2>}
      </Paper>
    </TemplatePage>
  );
}

const FlexColumn = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  & > * {
    margin-bottom: 1em;
  }
`;
