import { FC } from 'react';
import theme from '../theme';
import styled from '@emotion/styled';

const StyledButton = styled.button`
  padding: 0.75rem 1.25rem;
  background-color: ${theme.colors.foundational.blue};
  color: ${theme.colors.foundational.white};
  border-radius: 8px;
  font-family: ${theme.fonts.global};
  font-size: ${theme.fontSizes.body};
  font-weight: ${theme.fontWeights.bold};
  text-align: center;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;
  &:hover {
    background-color: ${theme.colors.expressive.blue[60]};
  }
  &:disabled {
    cursor: not-allowed;
    background-color: ${theme.colors.functional.grey};
    color: ${theme.colors.expressive.neutral[20]};
  }
  &:focus-visible {
    outline: 3px solid ${theme.colors.expressive.aqua[80]};
  }
`;

interface Props {
  onClick: () => void;
  disabled?: boolean;
  className?: string;
  tabIndex?: number;
}

const Button: FC<Props> = ({
  children,
  onClick,
  disabled = false,
  className = '',
  tabIndex = undefined,
}) => {
  return (
    <StyledButton
      className={`button ${className}`}
      disabled={disabled}
      onClick={() => onClick()}
      tabIndex={tabIndex}
    >
      {children}
    </StyledButton>
  );
};

export default Button;
