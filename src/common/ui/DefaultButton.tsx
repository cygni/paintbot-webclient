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
    fontSize = '1rem',
    width = 'fit-content',
    marginTop = 0,
  }) => ({
    backgroundColor,
    border: 'none',
    boxShadow: '0 1px 4px 0 rgba(0,0,0,0.3)',
    color,
    textAlign: 'center',
    fontSize,
    fontWeight: 700,
    fontFamily: '"Short Stack", cursive',
    padding: '0.75rem 1.25em',
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

export const SmallButton = styled(DefaultButton)`
  font-size: 1rem;
`;
