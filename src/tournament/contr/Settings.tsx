import React, { useContext } from 'react';
import styled from 'styled-components/macro';

import TournamentContext from '../../common/contexts/TournamentContext';

export default function Settings({ className }: { className: string }) {
  const tour = useContext(TournamentContext);
  const gameSettings = tour.gameSettings;

  return (
    <FlexColumn className={className}>
      <ul id="game-settings">
        {Object.keys(gameSettings).map(k => (
          <li key={k}>
            {<p>{k.toUpperCase()}</p>}
            {<p>{`${gameSettings[k]}`}</p>}
          </li>
        ))}
      </ul>
    </FlexColumn>
  );
}

const FlexColumn = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  & ul li {
    margin-bottom: 0px;
  }
  & * {
    align-self: center;
  }
  ul {
    width: 100%;
    padding: 1em;
    background-color: rgba(100%, 100%, 100%, 50%);
    border-radius: 10px;
    margin-top: 0px;
  }
  @media screen and (min-width: 1000px) {
    ul {
      padding: 1em 0em 1em 0em;
    }
  }
`;
