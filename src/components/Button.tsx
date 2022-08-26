import { FC } from 'react';
import theme from '../theme';
import styled from '@emotion/styled';

const StyledButton = styled.button`
  padding: 0.75rem 1.25rem;
  background-color: ${theme.colors.primary};
  color: ${theme.colors.textInverted};
  border-radius: 8px;
  font-family: ${theme.fonts.global};
  font-size: ${theme.fontSizes.body};
  font-weight: ${theme.fontWeights.bold};
  text-align: center;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;
  &:hover {
    background-color: ${theme.colors.primaryHover};
  }
  &:disabled {
    cursor: not-allowed;
    background-color: ${theme.colors.disabled};
  }
`;

interface Props {
  onClick: () => void;
  disabled?: boolean;
  className?: string;
}

const Button: FC<Props> = ({
  children,
  onClick,
  disabled = false,
  className = '',
}) => {
  return (
    <StyledButton
      className={className}
      disabled={disabled}
      onClick={() => onClick()}
    >
      {children}
    </StyledButton>
  );
};

export default Button;
