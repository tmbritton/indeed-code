import { FC, Dispatch } from 'react';
import { ContentWrapper } from '../components/LayoutComponents';
import Header from '../components/Header';
import Text from '../components/Text';
import Button from '../components/Button';
import styled from '@emotion/styled';
import { Action } from '../../types';
import { useNavigate, NavigateFunction } from 'react-router';
import { useAppDispatch } from '../store/hooks';
import Card from '../components/Card';
import theme from '../theme';

const StyledButton = styled(Button)`
  margin-top: auto;
  @media (min-width: ${theme.breakpoints.sm}) {
    margin-top: 1.5rem;
    align-self: center;
  }
`;

/**
 * Handle button click.
 * @param dispatch Action to dispatch to reducer.
 */
const clickHandler = (
  dispatch: Dispatch<Action>,
  navigate: NavigateFunction
) => {
  dispatch({ type: 'begin' });
  navigate('/quiz');
};

const Start: FC<{}> = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  return (
    <>
      <Header title="Start Quiz" />
      <ContentWrapper className="start">
        <Card
          imageUrl="http://placekitten.com/80/80"
          imageAlt="A cute kitten image to start the quiz."
        >
          <Text element="h1" textStyle="heading">
            Ready to take quiz?
          </Text>
          <Text>Click the button to begin!</Text>
          <StyledButton
            onClick={() => clickHandler(dispatch, navigate)}
            tabIndex={0}
          >
            Start Quiz!
          </StyledButton>
        </Card>
      </ContentWrapper>
    </>
  );
};

export default Start;
