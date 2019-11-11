import React, { useContext } from 'react';

import { TournamentContext } from '../common/Contexts';

export default function TournamentPropertySetter() {
  const tourContext = useContext(TournamentContext);
  return <p>{tourContext.tournamentName}</p>;
}
