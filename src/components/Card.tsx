import { FC } from 'react';
import theme from '../theme';
import styled from '@emotion/styled';

const StyledCard = styled('section')`
  display: flex;
  flex-direction: column;
  height: fit-content;
  background-color: ${theme.colors.expressive.neutral[0]};
  padding: 2.5rem 2rem;
  border-radius: 5px;
  box-shadow: ${theme.boxShadow};
  position: relative;
`;

const StyledImage = styled('img')`
  position: absolute;
  top: -2.5rem;
  left: 0;
  right: 0;
  margin-left: auto;
  margin-right: auto;
  border: 4px solid ${theme.colors.expressive.neutral[0]};
  border-radius: 100%;
`;

interface Props {
  className?: string;
  imageUrl?: string;
  imageAlt?: string;
}

const Card: FC<Props> = ({
  children,
  className = '',
  imageUrl = '',
  imageAlt = '',
}) => {
  return (
    <StyledCard className={`card ${className} ${imageUrl ? 'hasImage' : null}`}>
      {imageUrl ? (
        <StyledImage src={imageUrl} alt={imageAlt} width="80" height="80" />
      ) : null}
      {children}
    </StyledCard>
  );
};

export default Card;
