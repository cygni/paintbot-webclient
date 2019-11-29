import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import styled from 'styled-components/macro';

import { useRestAPIToGetGamesPlayedByPlayer } from '../common/API';
import { HistoricGame, PlayerHistory } from '../common/types';
import GameLink from '../common/ui/GameLink';
import TemplatePage from '../common/ui/TemplatePage';
import { isDifferent } from '../common/util';

export default function PlayerScreen(props: any) {
  const { name } = useParams<{ name: string }>();
  const decodedName = decodeURIComponent(name);
  const query = useRestAPIToGetGamesPlayedByPlayer(name);
  const [games, setGames] = useState({ items: new Array<HistoricGame>() });

  useEffect(
    () => {
      const update = () => {
        query((initialResult: PlayerHistory) => {
          if (isDifferent(initialResult, games)) {
            setGames(initialResult);
          }
        });
      };
      update();
      let interval: NodeJS.Timeout;
      interval = setInterval(update, 4000);
      return () => clearInterval(interval);
    },
    [query, games],
  );

  query(console.log);

  return (
    <TemplatePage>
      <h1>Player: {decodedName}</h1>
      {games.items.length > 0 && <h2>Played games</h2>}
      {games.items.length > 0 && (
        <FlexColumn>
          {games.items
            .sort((a, b) => b.gameDate.localeCompare(a.gameDate))
            .map(game => (
              <GameLink id={game.gameId}>{game.gameDate}</GameLink>
            ))}
        </FlexColumn>
      )}
      {games.items.length < 1 && <h2>{decodedName} has not played any games yet!</h2>}
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
