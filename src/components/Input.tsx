/**
 * Creating a custom, yet accessible, input so I can better control styling.
 * Styles based on Aria best practices example at w3.org.
 * @see https://www.w3.org/WAI/ARIA/apg/example-index/radio/radio.html
 */
import { FC } from 'react';
import theme from '../theme';
import styled from '@emotion/styled';
import Text from './Text';

const StyledInput = styled('div')`
  display: flex;
  align-items: center;
  cursor: pointer;
  position: relative;
  margin-bottom: 1rem;
  border-radius: 2px;
  background-color: ${theme.colors.expressive.aqua[20]};
  padding: 1rem;
  transition: background-color 0.2s ease-in-out;
  &::before {
    display: inline-block;
    min-width: 1.5rem;
    min-height: 1.5rem;
    border-radius: 100%;
    border-width: 1px;
    border-style: solid;
    border-color: ${theme.colors.functional.grey};
    transition: border-color 0.2s ease-in-out;
    content: '';
  }
  &.checked {
    background-color: ${theme.colors.expressive.aqua[80]};
    color: ${theme.colors.expressive.neutral[0]};
    box-shadow: ${theme.boxShadow};
    &::before {
      background: radial-gradient(
        ellipse at center,
        ${theme.colors.expressive.neutral[0]} 0%,
        ${theme.colors.expressive.neutral[0]} 40%,
        ${theme.colors.expressive.aqua[80]} 45%,
        ${theme.colors.expressive.aqua[80]} 100%
      );
      background-position: center;
      background-repeat: no-repeat;
    }
    &.disabled {
      background-color: ${theme.colors.functional.grey};
      color: ${theme.colors.expressive.neutral[10]};
      &::before {
        border-color: ${theme.colors.expressive.neutral[20]};
        background: radial-gradient(
          ellipse at center,
          ${theme.colors.expressive.neutral[40]} 0%,
          ${theme.colors.expressive.neutral[40]} 40%,
          ${theme.colors.functional.grey} 45%,
          ${theme.colors.functional.grey} 100%
        );
      }
    }
    &:not(.disabled) {
      &::before {
        border-color: ${theme.colors.foundational.white};
      }
    }
  }
  &.disabled {
    background-color: ${theme.colors.expressive.neutral[20]};
    cursor: not-allowed;
  }
  &:hover:not(.disabled):not(.checked) {
    background-color: ${theme.colors.expressive.aqua[40]};
  }
  &:focus-visible {
    outline: 3px solid ${theme.colors.expressive.aqua[50]};
  }
`;

const Label = styled(Text)`
  && {
    margin-left: 0.75rem;
    margin-bottom: 0;
    text-align: left;
    &.checked {
      color: ${theme.colors.expressive.neutral[0]};
    }
    &.disabled {
      color: ${theme.colors.expressive.neutral[60]};
    }
    &.checked&.disabled {
      color: ${theme.colors.expressive.neutral[40]};
    }
  }
`;

interface Props {
  value: string;
  type?: 'radio' | 'checkbox';
  checked?: boolean;
  disabled?: boolean;
  onClick: (arg0: string) => void;
  id: string;
}

/**
 * Handle clicks on input.
 * @param value
 * @param disabled
 * @param onClick
 */
const clickHandler = (
  value: string,
  disabled: boolean,
  onClick: (arg0: string) => void
): void => {
  if (!disabled) {
    onClick(value);
  }
};

/**
 * Select option on pressing enter or space.
 * @param event
 * @param value
 * @param disabled
 * @param onClick
 * @returns
 */
const keyPressHandler = (
  event: React.KeyboardEvent<HTMLDivElement>,
  value: string,
  disabled: boolean,
  onClick: (arg0: string) => void
): void => {
  if (disabled) {
    return;
  }
  if (event.key === 'Enter' || event.key === ' ') {
    onClick(value);
  }
};

const Input: FC<Props> = ({
  children,
  value,
  type = 'radio',
  checked = false,
  disabled = false,
  onClick,
  id,
}) => {
  return (
    <StyledInput
      role={type}
      aria-checked={checked ? 'true' : 'false'}
      tabIndex={disabled ? undefined : 0}
      onClick={() => clickHandler(value, disabled, onClick)}
      onKeyPress={(e) => keyPressHandler(e, value, disabled, onClick)}
      className={`input ${checked ? 'checked' : ''} ${
        disabled ? 'disabled' : ''
      }`}
      id={id}
    >
      <Label
        className={`label ${disabled ? 'disabled' : ''} ${
          checked ? 'checked' : ''
        }`}
        element="span"
      >
        {children}
      </Label>
    </StyledInput>
  );
};

export default Input;
