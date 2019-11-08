import React from 'react';
import styled from 'styled-components/macro';

import { StandardColors } from '../common/Constants';
import { LinkButton } from '../common/ui/DefaultButton';
import { Indent } from '../common/ui/Indent';
import { Row } from '../common/ui/Row';
import { Spacing } from '../common/ui/Spacing';
import yellowCharacter from '../resources/images/yellow_character.png';

export default function Header(props: any) {
  let loggedIn = false;
  if (props.loggedIn !== undefined && props.loggedIn) {
    loggedIn = true;
  }

  return (
    <MenuContainer>
      <Row justifyContent="space-between">
        <Spacing>
          <Row>
            <HeaderText>PAINTBOT</HeaderText>
            <YellowCharacter src={yellowCharacter} />
          </Row>
        </Spacing>
        <Spacing>
          <Indent num={2}>
            <LinkButton to="/">Start</LinkButton>
          </Indent>
          <Indent num={2}>
            <LinkButton to="/about">About</LinkButton>
          </Indent>
          <Indent num={2}>
            <LinkButton to="/tutorial">Getting started</LinkButton>
          </Indent>
          <Indent num={2}>
            <LinkButton to="/games">Games</LinkButton>
          </Indent>
          {loggedIn ? (
            <Indent num={2}>
              <LinkButton to="/tournament">Tournament</LinkButton>
            </Indent>
          ) : (
            ''
          )}
          <Indent num={2}>
            <LinkButton to="/account">{loggedIn ? 'Log out' : 'Log out'}</LinkButton>
          </Indent>
        </Spacing>
      </Row>
    </MenuContainer>
  );
}

const MenuContainer = styled.div`
  line-height: 50px;
  background-color: rgba(0, 0, 0, 0.1);
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
`;

const HeaderText = styled.span`
  font-size: 30px;
  font-weight: bold;
  height: 100%;
  padding-left: 20px;
  color: ${StandardColors.White};
`;

const YellowCharacter = styled.img`
  width: 30px;
  height: 30px;
`;
