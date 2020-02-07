import React from 'react';
import styled from 'styled-components/macro';

export default function CheckBox(props: any) {
  const k: string = props.k;
  const v = props.v;
  const oc = (event: any) => {
    props.oc(k, !v);
  };

  return (
    <Container>
      <input name={k} id={k} type="checkbox" onChange={oc} checked={v} />
      <label htmlFor={k}>{k}</label>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  align-items: baseline;
`;
