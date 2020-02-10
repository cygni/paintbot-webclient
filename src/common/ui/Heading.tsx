import styled, { css } from 'styled-components/macro';

const HeadingCss = css`
  font-family: 'Nanum Pen Script', sans-serif;
  margin: 0px;
`;

export const Heading1 = styled.h1`
  ${HeadingCss};
  font-size: 3rem;
`;

export const Heading3 = styled.h3`
  ${HeadingCss};
  font-size: 2rem;
`;
