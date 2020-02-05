import React from 'react';

import InputContainer from '../../../common/ui/InputContainer';

export default function NumberInput(props: any) {
  const k: string = props.k;
  const range = props.range;
  const oc = (event: any) => {
    props.oc(k, Number(event.target.value));
  };
  return (
    <InputContainer>
      <label htmlFor={k}>
        {k}: {props.t === 'range' && `${props.v}`}
      </label>
      <input name={k} id={k} type={props.t} {...range} onChange={oc} value={props.v} />
    </InputContainer>
  );
}
