import styled from '@emotion/styled';
import theme from '../theme';

export const PageWrapper = styled('div')`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  background-color: ${theme.colors.expressive.neutral[20]};
  height: 100vh;
  overflow-x: hidden;
`;

export const ContentWrapper = styled('main')`
  display: flex;
  flex-direction: row;
  align-items: stretch;
  width: 100%;
  height: 100%;
  position: relative;
  padding: 3rem;
  text-align: center;
  max-width: ${theme.breakpoints.md};
  flex: 0 1 auto;
  margin-top: -6rem;
  @media (min-width: ${theme.breakpoints.sm}) {
    flex-direction: column;
    height: auto;
    align-items: initial;
  }
  &.quiz {
    margin-top: -4rem;
  }
`;
