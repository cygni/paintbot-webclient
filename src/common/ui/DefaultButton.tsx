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
  ({ backgroundColor = CharacterColors.RedCharacter, color = StandardColors.White, width }) => ({
    borderRadius: 4,
    backgroundColor,
    border: 'none',
    color,
    textAlign: 'center',
    fontSize: 18,
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

export const LinkButton = styled(DefaultButton.withComponent(Link))({
  textDecoration: 'none',
});
