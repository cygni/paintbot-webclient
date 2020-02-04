import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components/macro';
import tinycolor from 'tinycolor2';

import { CharacterColors, StandardColors } from '../Constants';

interface ButtonProps {
  color?: string;
  width?: number;
  backgroundColor?: string;
}

export const DefaultButton = styled.button<ButtonProps>(
  ({ backgroundColor = CharacterColors.Blue, color = StandardColors.White, width = 'fit-content' }) => ({
    borderRadius: 4,
    backgroundColor,
    border: 'none',
    color,
    textAlign: 'center',
    fontSize: 25,
    padding: 10,
    width,
    cursor: 'pointer',

    ':hover': {
      backgroundColor: tinycolor(backgroundColor)
        .darken(5)
        .toRgbString(),
    },

    ':active': {
      backgroundColor: tinycolor(backgroundColor)
        .darken(10)
        .toRgbString(),
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
      <DefaultButton backgroundColor={props.backgroundColor} width={props.width} color={props.color}>
        {props.children}
      </DefaultButton>
    </L>
  );
}
