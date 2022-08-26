/**
 * Creating a custom, yet accessible, input so I can better control styling.
 * Styles based on Aria best practices example at w3.org.
 * @see https://www.w3.org/TR/2017/WD-wai-aria-practices-1.1-20170628/examples/radio/radio-1/radio-1.html
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
  &::before {
    display: inline-block;
    width: 1.5rem;
    height: 1.5rem;
    border-radius: 100%;
    border-width: 1px;
    border-style: solid;
    border-color: ${theme.colors.border};
    transition: border-color 0.2s ease-in-out;
    content: '';
  }
  &.checked {
    &::after {
      content: '';
      position: absolute;
      top: 6px;
      left: 6px;
      width: 0.75rem;
      height: 0.75rem;
      background-color: ${theme.colors.primary};
      border-radius: 100%;
    }
    &.disabled {
      &::after {
        background-color: ${theme.colors.disabled};
      }
    }
    &:not(.disabled) {
      &::before {
        border-color: ${theme.colors.primary};
      }
    }
  }
  &.disabled {
    cursor: not-allowed;
  }
  &:hover:not(.disabled) {
    &::before {
      border-color: ${theme.colors.primary};
    }
  }
`;

const Label = styled(Text)`
  && {
    margin-left: 0.75rem;
    margin-bottom: 0;
    &.disabled {
      color: ${theme.colors.textDisabled};
    }
  }
`;

interface Props {
  value: string;
  type?: 'radio' | 'checkbox';
  checked?: boolean;
  disabled?: boolean;
  onClick: (arg0: string) => void;
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
 * Get tabIndex value.
 * @param disabled Boolean indicating if input is disabled.
 * @param checked Boolean indicating if input is checked.
 * @returns undefined if disabled, -1 or 0 depending on checked.
 */
const getTabIndex = (
  disabled: boolean,
  checked: boolean
): number | undefined => {
  if (disabled) {
    return undefined;
  }
  if (checked) {
    return -1;
  }
  return 1;
};

const Input: FC<Props> = ({
  children,
  value,
  type = 'radio',
  checked = false,
  disabled = false,
  onClick,
}) => {
  return (
    <StyledInput
      role={type}
      aria-checked={checked ? 'true' : 'false'}
      tabIndex={getTabIndex(disabled, checked)}
      onClick={() => clickHandler(value, disabled, onClick)}
      className={`input ${checked ? 'checked' : ''} ${
        disabled ? 'disabled' : ''
      }`}
    >
      <Label className={`label ${disabled ? 'disabled' : ''}`} element="span">
        {children}
      </Label>
    </StyledInput>
  );
};

export default Input;
