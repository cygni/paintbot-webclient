import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';

import { useRestAPIToGetGamesPlayedByPlayer } from '../common/API';
import TemplatePage from '../common/TemplatePage';
import { HistoricGame, PlayerHistory } from '../common/types';
import { isDifferent } from '../common/util';
import GameLink from '../game/GameLink';

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
      interval = setInterval(update, 2000);
      return () => clearInterval(interval);
    },
    [query, games],
  );
  query(console.log);
  return (
    <TemplatePage>
      <h1>Player: {decodedName}</h1>
      {games.items.length > 0 && (
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Game</th>
            </tr>
          </thead>
          <tbody>
            {games.items
              .sort((a, b) => b.gameDate.localeCompare(a.gameDate))
              .map(game => (
                <tr>
                  <td>{game.gameDate}</td>
                  <td>
                    <GameLink id={game.gameId} />
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      )}
      {games.items.length < 1 && <h2>{decodedName} has not played any games yet!</h2>}
    </TemplatePage>
  );
}
