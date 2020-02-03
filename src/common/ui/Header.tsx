import React, { useContext, useState } from 'react';
import styled from 'styled-components/macro';

import yellowCharacter from '../../resources/images/yellow_character.png';
import { StandardColors } from '../Constants';
import AccountContext from '../contexts/AccountContext';
import TournamentContext from '../contexts/TournamentContext';

import ControlsButton from './ControlsButton';
import { LinkButton } from './DefaultButton';
import { Indent } from './Indent';
import { Row } from './Row';
import { Spacing } from './Spacing';

export default function Header() {
  const accContext = useContext(AccountContext);
  const tourContext = useContext(TournamentContext);
  const [collapsed, setCollapsed] = useState(true);
  const loggedIn = accContext.loggedIn;
  const user = accContext.username;

  const toggleCollapse = () => {
    setCollapsed(!collapsed);
  };

  return (
    <MenuContainer collapsed={collapsed}>
      <Spacing>
        <Row justifyContent="space-between">
          <div className="logo">
            <HeaderText>PAINTBOT</HeaderText>
            <YellowCharacter src={yellowCharacter} />
          </div>
          <ControlsButton onClick={toggleCollapse} className="menu-toggler">
            {collapsed ? 'Show menu' : 'Hide menu'}
          </ControlsButton>
        </Row>
      </Spacing>
      <div className="links">
        <MenuItem className="menu-item" oc={toggleCollapse} to="/">
          Start
        </MenuItem>
        <MenuItem className="menu-item" oc={toggleCollapse} to="/about">
          About
        </MenuItem>
        <MenuItem className="menu-item" oc={toggleCollapse} to="/readme">
          ReadMe
        </MenuItem>
        <MenuItem className="menu-item" oc={toggleCollapse} to="/arena">
          Arena
        </MenuItem>
        <MenuItem className="menu-item" oc={toggleCollapse} to="/tournament">
          {tourContext.tournamentName === '' ? 'Tournament' : tourContext.tournamentName}
        </MenuItem>
        <MenuItem className="menu-item" oc={toggleCollapse} to="/account">
          {loggedIn ? user : 'Log in'}
        </MenuItem>
      </div>
    </MenuContainer>
  );
}

function MenuItem(props: any) {
  return (
    <Spacing onClick={props.oc}>
      <Indent num={2}>
        <LinkButton to={props.to} width="100%">
          {props.children}
        </LinkButton>
      </Indent>
    </Spacing>
  );
}

interface MenuContainerProps {
  collapsed: boolean;
}

const MenuContainer = styled.div<MenuContainerProps>`
  width: 100%;
  line-height: 50px;
  background-color: rgba(0, 0, 0, 0.1);
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  display: flex;
  flex-direction: column;
  .menu-toggler {
    margin-right: 30px;
  }
  .logo {
    display: flex;
    flex-direction: row;
  }
  .links {
    visibility: ${props => (props.collapsed ? 'hidden' : 'visible')};
    width: 100%;
    display: ${props => (props.collapsed ? 'none' : 'flex')};
    flex-direction: column;
    a {
      width: auto;
      display: block;
    }
  }
  @media screen and (min-width: 1100px) {
    flex-direction: row;
    .menu-toggler {
      display: none;
    }
    .links {
      display: flex;
      visibility: visible;
      flex-direction: row;
      justify-content: flex-end;
      a {
        display: inline;
      }
    }
  }
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
