import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components/macro';
import tinycolor from 'tinycolor2';

import { CharacterColors, StandardColors } from '../Constants';

interface ButtonProps {
  color?: string;
  width?: number;
  backgroundColor?: string;
  fontSize?: number;
  marginTop?: any;
}

export const DefaultButton = styled.button<ButtonProps>(
  ({
    backgroundColor = CharacterColors.Blue,
    color = StandardColors.White,
    fontSize = 25,
    width = 'fit-content',
    marginTop = 0,
  }) => ({
    backgroundColor,
    border: 'none',
    boxShadow: '0 1px 4px 0 rgba(0,0,0,0.3)',
    color,
    textAlign: 'center',
    fontSize,
    padding: '0.25em 1em',
    width,
    cursor: 'pointer',
    marginTop,

    borderBottom: `3px solid ${tinycolor(backgroundColor)
      .darken(12)
      .toRgbString()}`,
    borderRadius: 40,

    ':hover': {
      backgroundColor: tinycolor(backgroundColor)
        .darken(5)
        .toRgbString(),
    },

    ':active': {
      backgroundColor: tinycolor(backgroundColor)
        .darken(5)
        .toRgbString(),
    },

    ':focus': {
      backgroundColor: tinycolor(backgroundColor)
        .darken(5)
        .toRgbString(),
      outline: 'none',
    },
  }),
);

export function LinkButton(props: any) {
  const L = styled(Link)`
    font-family: 'Nanum Pen Script', cursive;
    color: ${props.color};
    text-decoration: inherit;
  `;
  return (
    <L to={props.to}>
      <DefaultButton
        backgroundColor={props.backgroundColor}
        width={props.width}
        color={props.color}
        fontSize={props.fontSize}
        marginTop={props.marginTop}
      >
        {props.children}
      </DefaultButton>
    </L>
  );
}
