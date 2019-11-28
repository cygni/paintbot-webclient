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
`;

const Viewport = styled.div`
  min-width: 10em;
  width: 100%;
  display: block;
  border-radius: 3px;
  min-height: fit-content;
  max-height: 15em;
  margin-top: 1em;
  margin-bottom: 1em;
  padding: 1em;
  background-color: rgba(100%, 100%, 100%, 50%);
  overflow-y: auto;
`;
