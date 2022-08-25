import { FC } from 'react';
import theme from '../theme';
import styled from '@emotion/styled';
import Text from './Text';

interface Props {
  value: string;
  type?: 'radio' | 'checkbox';
  checked?: boolean;
  onClick: (arg0: string) => void;
}

const Input: FC<Props> = ({
  children,
  value,
  type = 'radio',
  checked = false,
  onClick,
}) => {
  return (
    <div
      role={type}
      aria-checked={checked ? 'true' : 'false'}
      tabIndex={checked ? -1 : 0}
      onClick={() => onClick(value)}
    >
      <Text>{children}</Text>
    </div>
  );
};

export default Input;
