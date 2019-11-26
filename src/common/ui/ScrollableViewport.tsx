import React from 'react';
import styled from 'styled-components/macro';

export default function ScrollableViewport(props: any) {
  return (
    <Viewport>
      <Scrollable>{props.children}</Scrollable>
    </Viewport>
  );
}

const Scrollable = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  overflow: hidden;
  & input {
    max-width: 7em;
  }
`;

const Viewport = styled.div`
  border-radius: 10px 0px 0px 10px;
  display: block;
  height: 20em;
  margin-top: 1em;
  margin-bottom: 1em;
  padding: 1em;
  background-color: #e8e8e8;
  overflow-y: scroll;
`;
