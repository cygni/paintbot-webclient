import React from 'react';

import { CharacterColors } from '../Constants';

import { DefaultButton } from './DefaultButton';

export default function ControlsButton(props: any) {
  return (
    <DefaultButton backgroundColor={CharacterColors.Blue} {...props}>
      {props.children && props.children}
      {!props.children && props.id}
    </DefaultButton>
  );
}