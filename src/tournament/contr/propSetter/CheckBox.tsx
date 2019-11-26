import React from 'react';

import InputContainer from '../../../common/ui/InputContainer';

export default function CheckBox(props: any) {
  const k: string = props.k;
  const v = props.v;
  const oc = (event: any) => {
    props.oc(k, !v);
  };
  return (
    <InputContainer>
      <label htmlFor={k}>{k.toUpperCase()}: </label>
      {v && <input name={k} id={k} type="checkbox" onChange={oc} checked />}
      {!v && <input name={k} id={k} type="checkbox" onChange={oc} />}
    </InputContainer>
  );
}
