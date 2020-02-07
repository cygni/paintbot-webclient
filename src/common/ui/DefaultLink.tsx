import { Link } from 'react-router-dom';
import styled from 'styled-components/macro';

import { CharacterColors } from '../Constants';

interface LinkProps {
  color?: string;
}

export const DefaultLink = styled(Link)<LinkProps>(({ color = CharacterColors.Blue }) => ({
  color,
  textDecoration: 'inherit',
  ':hover': {
    textDecoration: 'underline',
  },
  ':active': {
    textDecoration: 'underline',
  },
  ':focus': {
    textDecoration: 'underline',
    outline: 'none',
  },
}));
