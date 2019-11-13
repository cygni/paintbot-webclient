import React from 'react';

export default function CheckBox(props: any) {
  const k = props.k;
  const v = props.v;
  const oc = (event: any) => {
    props.oc(k, !v);
  };
  return (
    <>
      {v && <input name={k} id={k} type="checkbox" onChange={oc} checked />}
      {!v && <input name={k} id={k} type="checkbox" onChange={oc} />}
    </>
  );
}
