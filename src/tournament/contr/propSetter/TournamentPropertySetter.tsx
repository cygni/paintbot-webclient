import React, { useContext, useState } from 'react';
import styled from 'styled-components/macro';

import { REQUEST_TYPES } from '../../../common/API';
import AccountContext from '../../../common/contexts/AccountContext';
import TournamentContext from '../../../common/contexts/TournamentContext';
import WebSocketContext from '../../../common/contexts/WebSocketContext';
import ControlsButton from '../../../common/ui/ControlsButton';
import ScrollableViewport from '../../../common/ui/ScrollableViewport';
import Settings from '../../viewer/Settings';

import CheckBox from './CheckBox';
import NumberInput from './NumberInput';

export default function TournamentPropertySetter({ className }: { className: string }) {
  const [showConfForm, setShowConfForm] = useState(false);
  const tourContext = useContext(TournamentContext);
  const accContext = useContext(AccountContext);
  const [currentProperties, setCurrentProperties] = useState(tourContext);
  const gameSettings = currentProperties.gameSettings;
  const send = useContext(WebSocketContext);
  const [locked, setLocked] = useState(true);

  const toggleForm = (event: any) => {
    event.preventDefault();
    setShowConfForm(!showConfForm);
  };

  const handleSubmit = (event: any) => {
    if (event !== null) {
      event.preventDefault();
    }
    if (locked) {
      setLocked(false);
      return;
    } else {
      const mess = {
        gameSettings,
        token: accContext.token,
        type: REQUEST_TYPES.UPDATE_TOURNAMENT,
      };
      send(mess);
    }
  };

  const abort = () => {
    setCurrentProperties(tourContext);
    setLocked(true);
  };

  return (
    <FlexColumn className={className}>
      <h2>Game settings</h2>
      <ControlsButton onClick={toggleForm}>{showConfForm ? 'Hide' : 'Show'} settings</ControlsButton>
      {showConfForm && (
        <form onSubmit={handleSubmit}>
          <FlexRow>
            <ControlsButton onClick={handleSubmit}>{locked ? 'Make changes' : 'Save'}</ControlsButton>
            {!locked && <ControlsButton onClick={abort}>Abort</ControlsButton>}
          </FlexRow>
          {locked ? (
            <Settings className="settings" />
          ) : (
            <SettingsForm setter={setCurrentProperties} curr={currentProperties} />
          )}
        </form>
      )}
    </FlexColumn>
  );
}

const FlexRow = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: row;
  & * {
    margin-right: 1em;
    margin-left: 1em;
  }
`;

const FlexColumn = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  & button {
    margin-bottom: 1em;
  }
  & ul {
    margin: 0px;
  }
  & * {
    align-self: center;
  }
`;

function SettingsForm(props: any) {
  const currentProperties = props.curr;
  const setCurrentProperties = props.setter;
  const gameSettings = currentProperties.gameSettings;

  const updateProperty = (propKey: string, propValue: any) => {
    const copy = JSON.parse(JSON.stringify(currentProperties));
    if (propKey === 'tournamentId' || propKey === 'tournamentName') {
      copy[propKey] = propValue;
    } else {
      copy.gameSettings[propKey] = propValue;
    }
    setCurrentProperties(copy);
  };

  return (
    <ul id="game-settings">
      <ScrollableViewport>
        <li>
          <CheckBox k="obstaclesEnabled" v={gameSettings.obstaclesEnabled} oc={updateProperty} />
        </li>
        <li>
          <CheckBox k="powerUpsEnabled" v={gameSettings.powerUpsEnabled} oc={updateProperty} />
        </li>
        <li>
          <CheckBox k="trainingGame" v={gameSettings.trainingGame} oc={updateProperty} />
        </li>
        <li>
          <NumberInput
            k="addPowerUpLikelihood"
            range={{ min: 0, max: 100 }}
            t="range"
            oc={updateProperty}
            v={gameSettings.addPowerUpLikelihood}
          />
        </li>
        <li>
          <NumberInput
            k="removePowerUpLikelihood"
            range={{ min: 0, max: 100 }}
            t="range"
            oc={updateProperty}
            v={gameSettings.removePowerUpLikelihood}
          />
        </li>
        <li>
          <NumberInput
            k="maxNoofPlayers"
            range={{ min: 2, max: 20 }}
            t="range"
            oc={updateProperty}
            v={gameSettings.maxNoofPlayers}
          />
        </li>
        <li>
          <NumberInput
            k="startObstacles"
            range={{ min: 0, max: null }}
            t="number"
            oc={updateProperty}
            v={gameSettings.startObstacles}
          />
        </li>
        <li>
          <NumberInput
            k="startPowerUps"
            range={{ min: 0, max: null }}
            t="number"
            oc={updateProperty}
            v={gameSettings.startPowerUps}
          />
        </li>
        <li>
          <NumberInput
            k="explosionRange"
            range={{ min: 0, max: null }}
            t="number"
            oc={updateProperty}
            v={gameSettings.explosionRange}
          />
        </li>
        <li>
          <NumberInput
            k="gameDurationInSeconds"
            range={{ min: 0, max: null }}
            t="number"
            oc={updateProperty}
            v={gameSettings.gameDurationInSeconds}
          />
        </li>
        <li>
          <NumberInput
            k="noOfTicksInvulnerableAfterStun"
            range={{ min: 0, max: null }}
            t="number"
            oc={updateProperty}
            v={gameSettings.noOfTicksInvulnerableAfterStun}
          />
        </li>
        <li>
          <NumberInput
            k="noOfTicksStunned"
            range={{ min: 0, max: null }}
            t="number"
            oc={updateProperty}
            v={gameSettings.noOfTicksStunned}
          />
        </li>
        <li>
          <NumberInput
            k="pointsPerCausedStun"
            range={{ min: 0, max: null }}
            t="number"
            oc={updateProperty}
            v={gameSettings.pointsPerCausedStun}
          />
        </li>
        <li>
          <NumberInput
            k="pointsPerTileOwned"
            range={{ min: 0, max: null }}
            t="number"
            oc={updateProperty}
            v={gameSettings.pointsPerTileOwned}
          />
        </li>
        <li>
          <NumberInput
            k="timeInMsPerTick"
            range={{ min: 0, max: null }}
            t="number"
            oc={updateProperty}
            v={gameSettings.timeInMsPerTick}
          />
        </li>
      </ScrollableViewport>
    </ul>
  );
}
