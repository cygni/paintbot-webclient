import React from 'react';

import CheckBox from './CheckBox';
import NumberInput from './NumberInput';

export default function FormComponent(props: any) {
  const k: string = props.k;
  const range = props.range;
  const t = props.type === 'boolean' ? 'checkbox' : range.max === null ? 'number' : 'range';

  return (
    <div>
      <label htmlFor={k}>{k}: </label>
      {t === 'checkbox' && <CheckBox k={k} v={props.v} oc={props.oc} />}
      {t !== 'checkbox' && <NumberInput k={k} range={range} t={t} oc={props.oc} v={props.v} />}
      <p>Current value: {`${props.currentContextValue}`}</p>
    </div>
  );
}
