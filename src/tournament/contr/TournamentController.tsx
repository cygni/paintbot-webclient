import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components/macro';

import AccountContext from '../../common/contexts/AccountContext';
import TournamentContext from '../../common/contexts/TournamentContext';
import { Player } from '../../common/types';
import { Heading1 } from '../../common/ui/Heading';

import Controls from './Controls';
import GamePlan, { PlayedGame } from './GamePlan';
import Players from './Players';
import TournamentPropertySetter from './propSetter/TournamentPropertySetter';
import Settings from './Settings';

interface NextGame {
  lvl: number;
  game: number;
  players: Player[];
}

export default function TournamentController() {
  const tour = useContext(TournamentContext);
  const acc = useContext(AccountContext);
  const levels = tour.gamePlan.tournamentLevels;
  const started = levels.length > 0 && levels[0].tournamentGames[0].gameId !== null;
  const [nextGame, setNextGame] = useState<NextGame>({ lvl: 0, game: 0, players: [] });
  const showSetters = acc.loggedIn && !started;
  const [playedGames, setPlayedGames] = useState(new Array<PlayedGame>());

  useEffect(
    () => {
      const result = new Array<PlayedGame>();
      let game = 0;
      let level = 0;
      for (const lvl of tour.gamePlan.tournamentLevels) {
        for (const g of lvl.tournamentGames) {
          if (g.gamePlayed) {
            result.unshift({ gameId: g.gameId, players: g.players });
            game = game + 1;
            if (game === tour.gamePlan.tournamentLevels[level].tournamentGames.length) {
              game = 0;
              level = level + 1;
            }
          }
        }
      }
      let players = Array<Player>();
      if (tour.gamePlan.tournamentLevels[level] && tour.gamePlan.tournamentLevels[level].tournamentGames[game]) {
        players = tour.gamePlan.tournamentLevels[level].tournamentGames[game].players;
      }
      setPlayedGames(result);
      setNextGame({ lvl: level, game, players });
    },
    [tour],
  );

  return (
    <>
      <Heading1>{tour.tournamentName}</Heading1>
      {acc.loggedIn && <Controls started={started} />}
      {started && (
        <Papers>
          <PaperColumn flex={1}>
            <GamePlan lvl={nextGame.lvl} game={nextGame.game} players={nextGame.players} playedGames={playedGames} />
          </PaperColumn>
          <PaperColumn>
            <Players />
            <Settings />
          </PaperColumn>
        </Papers>
      )}
      {!started && (
        <Papers>
          <PaperColumn flex={1}>
            <Players />
          </PaperColumn>
          <PaperColumn>
            {showSetters && <TournamentPropertySetter />}
            {!showSetters && <Settings />}
          </PaperColumn>
        </Papers>
      )}
    </>
  );
}

const Papers = styled.div`
  display: flex;
  width: 100%;
  max-width: 800px;
  margin-top: 1rem;
  @media screen and (max-width: 800px) {
    flex-direction: column;
  }
`;

interface PaperColumnProps {
  flex?: number;
}

const PaperColumn = styled.div<PaperColumnProps>`
  flex: ${props => props.flex};
  display: flex;
  flex-direction: column;
  margin: 0 1rem;
  & > div {
    width: 100%;
  }
  @media screen and (max-width: 800px) {
    flex: none;
  }
`;
