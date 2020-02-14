import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components/macro';

import yellowCharacter from '../../resources/images/yellow_character.png';
import { CharacterColors, StandardColors } from '../Constants';
import AccountContext from '../contexts/AccountContext';

import ControlsButton from './ControlsButton';
import { Indent } from './Indent';
import { Row } from './Row';
import { Spacing } from './Spacing';

export default function Header() {
  const accContext = useContext(AccountContext);
  const [collapsed, setCollapsed] = useState(true);
  const loggedIn = accContext.loggedIn;
  const user = accContext.username;

  const toggleCollapse = () => {
    setCollapsed(!collapsed);
  };

  return (
    <MenuContainer collapsed={collapsed}>
      <Spacing>
        <Row justifyContent="space-between" alignItems="center" height="100%">
          <div className="logo">
            <HeaderText>
              <HeaderLetter color={CharacterColors.Magenta}>P</HeaderLetter>
              <HeaderLetter color={CharacterColors.Lavender}>A</HeaderLetter>
              <HeaderLetter color={CharacterColors.Cyan}>I</HeaderLetter>
              <HeaderLetter color={CharacterColors.Orange}>N</HeaderLetter>
              <HeaderLetter color={CharacterColors.Red}>T</HeaderLetter>
              <HeaderLetter color={CharacterColors.Green}>B</HeaderLetter>
              <HeaderLetter color={CharacterColors.Blue}>O</HeaderLetter>
              <HeaderLetter color={CharacterColors.Yellow}>T</HeaderLetter>
            </HeaderText>
            <YellowCharacter src={yellowCharacter} />
          </div>
          <ControlsButton onClick={toggleCollapse} className="menu-toggler">
            {collapsed ? 'Show menu' : 'Hide menu'}
          </ControlsButton>
        </Row>
      </Spacing>
      <div className="links">
        <MenuItem oc={toggleCollapse} to="/">
          Welcome
        </MenuItem>
        <MenuItem oc={toggleCollapse} to="/about">
          About
        </MenuItem>
        <MenuItem oc={toggleCollapse} to="/readme">
          Getting started
        </MenuItem>
        <MenuItem oc={toggleCollapse} to="/arena">
          Arena
        </MenuItem>
        <MenuItem oc={toggleCollapse} to="/tournament">
          Tournament
        </MenuItem>
        <MenuItem oc={toggleCollapse} to="/account">
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
        <MenuButton to={props.to} width="100%">
          {props.children}
        </MenuButton>
      </Indent>
    </Spacing>
  );
}

function MenuButton(props: any) {
  const StyledLink = styled(Link)`
    text-decoration: inherit;
    color: black;
    font-size: 25px;
    cursor: pointer;
    :hover,
    :active,
    :focus {
      color: ${CharacterColors.Red};
    }
    :focus {
      outline: none;
    }
  `;
  return <StyledLink to={props.to}>{props.children}</StyledLink>;
}

interface MenuContainerProps {
  collapsed: boolean;
}

const MenuContainer = styled.div<MenuContainerProps>`
  width: 100%;
  line-height: 50px;
  background-color: white;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  display: flex;
  flex-direction: column;
  font-family: 'Nanum Pen Script', cursive;
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
  font-size: 44px;
  font-weight: bold;
  height: 100%;
  padding-left: 20px;
  color: ${StandardColors.White};
`;

const HeaderLetter = styled.span`
  color: ${props => props.color};
`;

const YellowCharacter = styled.img`
  width: 30px;
  height: 30px;
`;
