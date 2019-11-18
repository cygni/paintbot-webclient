import React from 'react';

export default function NumberInput(props: any) {
  const k = props.k;
  const range = props.range;
  const oc = (event: any) => {
    props.oc(k, Number(event.target.value));
  };
  return (
    <>
      <label htmlFor={k}>{k}: </label>
      <input name={k} id={k} type={props.t} {...range} onChange={oc} value={props.v} />
    </>
  );
}
