import { FC } from 'react';
import theme from '../theme';
import styled from '@emotion/styled';

interface Props {
  textStyle?: 'body' | 'heading' | 'heading2' | 'feedback';
  color?: 'default' | 'success' | 'failure';
  element?: 'h1' | 'h2' | 'p' | 'span';
}

const Text: FC<Props> = ({
  children,
  textStyle = 'body',
  color = 'default',
  element = 'p',
}) => {
  // Do the styled component here so we can dynamically define the HTML tag.
  const StyledTag = styled(element)`
    font-family: ${theme.fonts.global};
    &.textStyle-body {
      font-size: ${theme.fontSizes.body};
      font-weight: ${theme.fontWeights.normal};
      line-height: 1.5;
      margin-bottom: 1rem;
    }
    &.textStyle-heading {
      font-size: ${theme.fontSizes.heading};
      font-weight: ${theme.fontWeights.bold};
      line-height: 1.25;
      margin-bottom: 1rem;
      margin-bottom: 1.25rem;
    }
    &.textStyle-heading2 {
      font-size: ${theme.fontSizes.subheading};
      font-weight: ${theme.fontWeights.bold};
      line-height: 1.5;
      margin-bottom: 1rem;
    }
    &.textStyle-feedback {
      font-size: ${theme.fontSizes.body};
      font-weight: ${theme.fontWeights.bold};
      line-height: 1.5;
      margin-bottom: 1.5rem;
    }
    &.color-default {
      color: ${theme.colors.text};
    }
    &.color-success {
      color: ${theme.colors.success};
    }
    &.color-failure {
      color: ${theme.colors.failure};
    }
  `;

  return (
    <StyledTag className={`textStyle-${textStyle} color-${color}`}>
      {children}
    </StyledTag>
  );
};

export default Text;
