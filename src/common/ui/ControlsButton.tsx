import React from 'react';

import { CharacterColors } from '../Constants';
import DefaultButton from './DefaultButton';

export default function ControlsButton(props: any) {
  return (
    <DefaultButton backgroundColor={props.disabled ? CharacterColors.Grey : CharacterColors.Blue} {...props}>
      {props.children && props.children}
      {!props.children && props.id}
    </DefaultButton>
  );
}
