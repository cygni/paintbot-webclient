import React from 'react';

import TournamentRefresher from '../TournamentRefresher';
import TournamentViewer from '../TournamentViewer';

import TournamentPropertySetter from './propSetter/TournamentPropertySetter';
import TournamentKiller from './TournamentKiller';
import TournamentStarter from './TournamentStarter';

export default function TournamentController(props: any) {
  return (
    <div id="tournament-configuration-form">
      <TournamentViewer />
      <TournamentPropertySetter />
      <TournamentRefresher />
      <TournamentKiller />
      <TournamentStarter />
    </div>
  );
}
