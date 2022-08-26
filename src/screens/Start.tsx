import { FC, Dispatch } from 'react';
import { ContentWrapper } from '../components/LayoutComponents';
import Text from '../components/Text';
import Button from '../components/Button';
import styled from '@emotion/styled';
import { useQuizContext } from '../providers/QuizContextProvider';
import { Action } from '../../types';
import { useNavigate, NavigateFunction } from 'react-router';

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
  const [state, dispatch] = useQuizContext();
  const navigate = useNavigate();
  return (
    <ContentWrapper>
      <iframe
        src="https://giphy.com/embed/LpcAbToYM8lKFoVTQ0"
        width="100%"
        frameBorder="0"
        className="giphy-embed"
        allowFullScreen
      ></iframe>
      <Text element="h1" textStyle="heading">
        Ready to take quiz?
      </Text>
      <Text>Click the button to begin!</Text>
      <StyledButton onClick={() => clickHandler(dispatch, navigate)}>
        Start Quiz!
      </StyledButton>
    </ContentWrapper>
  );
};

export default Start;
