import React from 'react';

import { CharacterColors } from '../Constants';

import { SmallButton } from './DefaultButton';

export default function ControlsButton(props: any) {
  return (
    <SmallButton backgroundColor={props.disabled ? CharacterColors.Grey : CharacterColors.Blue} {...props}>
      {props.children && props.children}
      {!props.children && props.id}
    </SmallButton>
  );
}
