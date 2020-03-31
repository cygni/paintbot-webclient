import React from 'react';
import styled from 'styled-components/macro';

import { Heading2 } from '../common/ui/Heading';
import { PaperRow } from '../common/ui/Paper';

import { GameLink } from './SearchScreen';

export interface BasicGameInfo {
  gameId: string;
  players: string[];
  gameDate: string;
}

export default function GamesList(props: { games: BasicGameInfo[] }) {
  if (props.games.length === 0) {
    return null;
  }

  return (
    <PaperRow>
      <Heading2>{props.games.length} last game(s)</Heading2>
      <GamesListContainer>
        {props.games.map(game => {
          return (
            <GameRow key={`${game.gameId}`}>
              <GameLink to={`/game/${encodeURIComponent(game.gameId)}`}>
                <div>
                  <GameDate>{game.gameDate}</GameDate>
                  <GameId>{game.gameId}</GameId>
                </div>
                <PlayersContainer>
                  <Players>{game.players.join(', ')}</Players>
                </PlayersContainer>
              </GameLink>
            </GameRow>
          );
        })}
      </GamesListContainer>
    </PaperRow>
  );
}

const GamesListContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  padding-top: 1em;
`;

const GameRow = styled.div`
  padding-bottom: 1em;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const GameId = styled.span``;

const GameDate = styled.span`
  padding-right: 1em;
`;

const PlayersContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const Players = styled.span``;
