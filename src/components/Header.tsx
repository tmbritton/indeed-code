import { FC } from 'react';
import theme from '../theme';
import styled from '@emotion/styled';
import Text from './Text';

const StyledHeader = styled.header`
  background-color: ${theme.colors.foundational.blue};
  width: 100%;
  padding: 0 3rem 6rem 3rem;
  & > .header__textWrap {
    max-width: ${theme.breakpoints.md};
    margin: auto;
  }
`;

interface Props {
  title: string;
}

const Header: FC<Props> = ({ title }) => {
  return (
    <StyledHeader>
      <div className="header__textWrap">
        <Text textStyle="heading" color="inverted" element="h1">
          {title}
        </Text>
      </div>
    </StyledHeader>
  );
};

export default Header;
