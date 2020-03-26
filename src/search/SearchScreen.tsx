import React, { useState } from 'react';
import { Link, LinkProps } from 'react-router-dom';
import styled from 'styled-components/macro';

import { CharacterColors } from '../common/Constants';
import ControlsButton from '../common/ui/ControlsButton';
import { Heading1 } from '../common/ui/Heading';
import { Paper, PaperRow } from '../common/ui/Paper';
import Config from '../Config';

interface BasicGameInfo {
  gameId: string;
  players: string[];
  gameDate: string;
}

function GamesList(props: { games: BasicGameInfo[] }) {
  return (
    <PaperRow>
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
        {props.games.length === 0 && <div>No games :(</div>}
      </GamesListContainer>
    </PaperRow>
  );
}

function SearchForm(props: any) {
  return (
    <div id="search-form">
      <form onSubmit={props.handleSubmit}>
        <PaperRow>
          <Center>
            <InputContainer>
              <label htmlFor="search">Search</label>
              <input name="search" id="search" type="text" value={props.searchTerm} onChange={props.handleChange} />
            </InputContainer>
          </Center>
        </PaperRow>
        <PaperRow textAlign="center">
          <ControlsButton onClick={props.handleSubmit}>Search</ControlsButton>
        </PaperRow>
        {props.errorMessage && (
          <PaperRow>
            <Error>{props.errorMessage}</Error>
          </PaperRow>
        )}
      </form>
    </div>
  );
}

export default function SearchScreen() {
  const [searchTerm, setSearchTerm] = useState('');
  const [gamesList, setGamesList] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const handleSearchUpdate = (event: any) => {
    setSearchTerm(event.target.value);
  };
  const handleSearchSubmit = async (event: any) => {
    event.preventDefault();
    const response = await fetch(`${Config.BackendUrl}/history/search/${searchTerm}`)
      .then(resp => resp.json())
      .then(resp => resp.items)
      .catch(error => setErrorMessage('Failed to search'));
    setGamesList(response);
  };
  return (
    <Container>
      <Paper>
        <PaperRow>
          <Heading1>Search</Heading1>
        </PaperRow>
        <SearchForm
          searchTerm={searchTerm}
          handleChange={handleSearchUpdate}
          handleSubmit={handleSearchSubmit}
          errorMessage={errorMessage}
        />
        <GamesList games={gamesList} />
      </Paper>
    </Container>
  );
}

export const GameLink = styled(Link)<LinkProps>(() => ({
  'min-width': '40em',
  color: '#000',
  border: '2px solid #7b6135',
  background: '#ceb48a',
  padding: '0.5em',
  textDecoration: 'inherit',
  ':hover': {
    textDecoration: 'underline',
  },
  ':active': {
    textDecoration: 'underline',
  },
  ':focus': {
    textDecoration: 'underline',
    outline: 'none',
  },
}));

const GamesListContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
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

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const Center = styled.div`
  display: flex;
  justify-content: center;
`;

const Error = styled.span`
  color: ${CharacterColors.Red};
  font-size: 1rem;
`;

const Container = styled.div`
  width: 100%;

  @media screen and (min-width: 1100px) {
    width: 70%;
  }
  @media screen and (min-width: 1600px) {
    width: 60%;
  }
`;
