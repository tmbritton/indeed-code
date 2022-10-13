import { FC } from 'react';
import theme from '../theme';
import styled from '@emotion/styled';

interface Props {
  textStyle?: 'body' | 'heading' | 'heading2' | 'feedback' | 'italic';
  color?:
    | 'default'
    | 'success'
    | 'failure'
    | 'deemphasize'
    | 'inverted'
    | 'informational';
  element?: 'h1' | 'h2' | 'p' | 'span';
  className?: string;
  id?: string;
}

const Text: FC<Props> = ({
  children,
  textStyle = 'body',
  color = 'default',
  element = 'p',
  className = '',
  id = '',
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
    &.textStyle-italic {
      font-size: ${theme.fontSizes.body};
      font-weight: ${theme.fontWeights.normal};
      line-height: 1.5;
      margin-bottom: 1rem;
      font-style: italic;
    }
    &.color-default {
      color: ${theme.colors.foundational.charcoal};
    }
    &.color-success {
      color: ${theme.colors.functional.success};
    }
    &.color-failure {
      color: ${theme.colors.functional.failure};
    }
    &.color-deemphasize {
      color: ${theme.colors.functional.grey};
    }
    &.color-inverted {
      color: ${theme.colors.expressive.neutral[0]};
    }
    &.color-informational {
      color: ${theme.colors.expressive.earth[70]};
    }
  `;

  return (
    <StyledTag
      className={`textStyle-${textStyle} color-${color} ${className}`}
      id={id}
    >
      {children}
    </StyledTag>
  );
};

export default Text;
