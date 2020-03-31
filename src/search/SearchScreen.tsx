import React, { ChangeEvent, useEffect, useState } from 'react';
import { Link, LinkProps, useHistory, useLocation } from 'react-router-dom';
import styled from 'styled-components/macro';

import { useApiToSearchGamesPlayed } from '../common/API';
import { CharacterColors } from '../common/Constants';
import ControlsButton from '../common/ui/ControlsButton';
import { Heading1 } from '../common/ui/Heading';
import Loading from '../common/ui/Loading';
import { Paper, PaperRow } from '../common/ui/Paper';

import GamesList from './GameList';

function SearchForm(props: {
  disabled: boolean;
  searchTerm: string;
  handleSubmit: (event: any) => any;
  handleChange: (event: ChangeEvent<HTMLInputElement>) => void;
  errorMessage?: string;
}) {
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
          <ControlsButton disabled={props.disabled} onClick={props.handleSubmit}>
            Search
          </ControlsButton>
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

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export default function SearchScreen() {
  const query = useQuery().get('q') || '';
  const history = useHistory();
  const [searchTerm, setSearchTerm] = useState(query);
  const [loading, setLoading] = useState(false);
  const searchGames = useApiToSearchGamesPlayed(searchTerm);
  const [gamesList, setGamesList] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const doSearch = async () => {
    setLoading(true);
    let games = [];
    try {
      games = await searchGames().then(resp => resp.items);
    } catch (e) {
      console.log(e);
      setErrorMessage('Failed to search');
    }

    history.push({
      pathname: '/search',
      search: new URLSearchParams(`?q=${searchTerm}`).toString(),
    });
    setGamesList(games);
    setLoading(false);
  };

  useEffect(() => {
    if (query) {
      doSearch();
    }
  }, []);

  const handleSearchUpdate = (event: any) => {
    setSearchTerm(event.target.value);
  };
  const handleSearchSubmit = async (event: any) => {
    event.preventDefault();
    doSearch();
  };
  return (
    <Container>
      <Paper>
        <PaperRow>
          <Heading1>Search</Heading1>
        </PaperRow>
        <SearchForm
          disabled={loading}
          searchTerm={searchTerm}
          handleChange={handleSearchUpdate}
          handleSubmit={handleSearchSubmit}
          errorMessage={errorMessage}
        />
        {loading && <Loading />}
        {!loading && <GamesList games={gamesList} />}
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
