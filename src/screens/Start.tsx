import { FC, Dispatch } from 'react';
import { ContentWrapper } from '../components/LayoutComponents';
import Text from '../components/Text';
import Button from '../components/Button';
import styled from '@emotion/styled';
import { Action } from '../../types';
import { useNavigate, NavigateFunction } from 'react-router';
import { useAppDispatch } from '../store/hooks';

const StyledButton = styled(Button)`
  margin-top: auto;
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
    <ContentWrapper>
      <img
        src="http://placekitten.com/300/200"
        alt="Kitten photo"
        width="300"
        height="200"
        style={{ margin: '0 auto' }}
      />
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
    </ContentWrapper>
  );
};

export default Start;
