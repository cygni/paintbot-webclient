import React, { useContext, useState } from 'react';
import styled from 'styled-components/macro';

import { REQUEST_TYPES } from '../../../common/API';
import AccountContext from '../../../common/contexts/AccountContext';
import TournamentContext from '../../../common/contexts/TournamentContext';
import WebSocketContext from '../../../common/contexts/WebSocketContext';
import DefaultButton from '../../../common/ui/DefaultButton';
import { Paper, PaperList, PaperListItem, PaperRow, PaperTopic } from '../../../common/ui/Paper';

import CheckBox from './CheckBox';
import NumberInput from './NumberInput';

export default function TournamentPropertySetter() {
  const [dirty, setDirty] = useState(false);
  const tourContext = useContext(TournamentContext);
  const accContext = useContext(AccountContext);
  const [currentProperties, setCurrentProperties] = useState(tourContext);
  const gameSettings = currentProperties.gameSettings;
  const send = useContext(WebSocketContext);

  const handleSubmit = (event: any) => {
    if (event !== null) {
      event.preventDefault();
    } else {
      return;
    }
    if (dirty) {
      setDirty(false);
      const mess = {
        gameSettings,
        token: accContext.token,
        type: REQUEST_TYPES.UPDATE_TOURNAMENT,
      };
      send(mess);
    }
  };

  const handleSetCurrentProperties = (props: any) => {
    setCurrentProperties(props);
    setDirty(true);
  };

  return (
    <Paper>
      <PaperTopic>Settings</PaperTopic>
      <Form onSubmit={handleSubmit}>
        <PaperRow>
          <DefaultButton onClick={handleSubmit} disabled={!dirty}>
            Save changes
          </DefaultButton>
        </PaperRow>
        <SettingsForm setter={handleSetCurrentProperties} curr={currentProperties} />
      </Form>
    </Paper>
  );
}

const Form = styled.form`
  width: 100%;
  margin-top: 0px;
  min-width: 10em;
  padding: 1em 0;
  input {
    margin-bottom: 0;
    display: flex;
    flex-direction: column;
    padding-inline-start: 0px;
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
    <PaperList>
      <PaperListItem>
        <CheckBox k="obstaclesEnabled" v={gameSettings.obstaclesEnabled} oc={updateProperty} />
      </PaperListItem>
      <PaperListItem>
        <CheckBox k="powerUpsEnabled" v={gameSettings.powerUpsEnabled} oc={updateProperty} />
      </PaperListItem>
      <PaperListItem>
        <CheckBox k="pointsPerTick" v={gameSettings.pointsPerTick} oc={updateProperty} />
      </PaperListItem>
      <PaperListItem>
        <CheckBox k="trainingGame" v={gameSettings.trainingGame} oc={updateProperty} />
      </PaperListItem>
      <PaperListItem>
        <NumberInput
          k="addPowerUpLikelihood"
          range={{ min: 0, max: 100 }}
          t="range"
          oc={updateProperty}
          v={gameSettings.addPowerUpLikelihood}
        />
      </PaperListItem>
      <PaperListItem>
        <NumberInput
          k="removePowerUpLikelihood"
          range={{ min: 0, max: 100 }}
          t="range"
          oc={updateProperty}
          v={gameSettings.removePowerUpLikelihood}
        />
      </PaperListItem>
      <PaperListItem>
        <NumberInput
          k="maxNoofPlayers"
          range={{ min: 2, max: 20 }}
          t="range"
          oc={updateProperty}
          v={gameSettings.maxNoofPlayers}
        />
      </PaperListItem>
      <PaperListItem>
        <NumberInput
          k="startObstacles"
          range={{ min: 0, max: null }}
          t="number"
          oc={updateProperty}
          v={gameSettings.startObstacles}
        />
      </PaperListItem>
      <PaperListItem>
        <NumberInput
          k="startPowerUps"
          range={{ min: 0, max: null }}
          t="number"
          oc={updateProperty}
          v={gameSettings.startPowerUps}
        />
      </PaperListItem>
      <PaperListItem>
        <NumberInput
          k="explosionRange"
          range={{ min: 0, max: null }}
          t="number"
          oc={updateProperty}
          v={gameSettings.explosionRange}
        />
      </PaperListItem>
      <PaperListItem>
        <NumberInput
          k="gameDurationInSeconds"
          range={{ min: 0, max: null }}
          t="number"
          oc={updateProperty}
          v={gameSettings.gameDurationInSeconds}
        />
      </PaperListItem>
      <PaperListItem>
        <NumberInput
          k="noOfTicksInvulnerableAfterStun"
          range={{ min: 0, max: null }}
          t="number"
          oc={updateProperty}
          v={gameSettings.noOfTicksInvulnerableAfterStun}
        />
      </PaperListItem>
      <PaperListItem>
        <NumberInput
          k="noOfTicksStunned"
          range={{ min: 0, max: null }}
          t="number"
          oc={updateProperty}
          v={gameSettings.noOfTicksStunned}
        />
      </PaperListItem>
      <PaperListItem>
        <NumberInput
          k="pointsPerCausedStun"
          range={{ min: 0, max: null }}
          t="number"
          oc={updateProperty}
          v={gameSettings.pointsPerCausedStun}
        />
      </PaperListItem>
      <PaperListItem>
        <NumberInput
          k="pointsPerTileOwned"
          range={{ min: 0, max: null }}
          t="number"
          oc={updateProperty}
          v={gameSettings.pointsPerTileOwned}
        />
      </PaperListItem>
      <PaperListItem>
        <NumberInput
          k="timeInMsPerTick"
          range={{ min: 0, max: null }}
          t="number"
          oc={updateProperty}
          v={gameSettings.timeInMsPerTick}
        />
      </PaperListItem>
    </PaperList>
  );
}
