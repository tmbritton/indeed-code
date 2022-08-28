import styled from '@emotion/styled';
import theme from '../theme';

export const PageWrapper = styled('div')`
  display: flex;
  align-items: center;
  justify-content: space-around;
`;

export const ContentWrapper = styled('main')`
  display: flex;
  flex-direction: column;
  width: 100%;
  position: relative;
  padding: 3rem;
  text-align: center;
  height: 100vh;
  max-width: ${theme.breakpoints.md};
  flex: 0 1 auto;
`;
