import React, { useContext } from 'react';
import styled from 'styled-components/macro';

import { StandardColors } from '../common/Constants';
import { LinkButton } from '../common/ui/DefaultButton';
import { Indent } from '../common/ui/Indent';
import { Row } from '../common/ui/Row';
import { Spacing } from '../common/ui/Spacing';
import yellowCharacter from '../resources/images/yellow_character.png';

import AccountContext from './AccountContext';

export default function Header(props: any) {
  const accContext = useContext(AccountContext);
  const loggedIn = accContext.loggedIn;
  const user = accContext.username;
  return (
    <MenuContainer>
      <Row justifyContent="space-between">
        <Spacing>
          <Row>
            <HeaderText>PAINTBOT</HeaderText>
            <YellowCharacter src={yellowCharacter} />
          </Row>
        </Spacing>
        <MenuItem to="/">Start</MenuItem>
        <MenuItem to="/about">About</MenuItem>
        <MenuItem to="/tutorial">Getting started</MenuItem>
        <MenuItem to="/games">Games</MenuItem>
        <MenuItem to="/tournament">Tournament</MenuItem>
        <MenuItem to="/account">{loggedIn ? user : 'Log in'}</MenuItem>
      </Row>
    </MenuContainer>
  );
}

function MenuItem(props: any) {
  return (
    <Spacing>
      <Indent num={2}>
        <LinkButton to={props.to}>{props.children}</LinkButton>
      </Indent>
    </Spacing>
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
