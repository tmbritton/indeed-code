import { FC, Dispatch, useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { useNavigate, NavigateFunction } from 'react-router';
import { useQuizContext } from '../providers/QuizContextProvider';
import { ContentWrapper } from '../components/LayoutComponents';
import Text from '../components/Text';
import Button from '../components/Button';
import { Action, IScore } from '../../types';

const StyledButton = styled(Button)`
  margin-top: auto;
`;

const formatDate = (timeStamp: number): string => {
  const date = new Date(timeStamp);
  return `${date.getMonth()}/${date.getDate()}/${date.getFullYear()}`;
};

/**
 * Handle button click.
 * @param dispatch Action to dispatch to reducer.
 */
const clickHandler = (
  dispatch: Dispatch<Action>,
  navigate: NavigateFunction
) => {
  dispatch({ type: 'playAgain' });
  navigate('/');
};

const Results: FC<{}> = () => {
  const [state, dispatch] = useQuizContext();
  const [highScore, setHighScore] = useState<IScore>({
    correct: 0,
    count: 0,
    timeStamp: 0,
  });
  const navigate = useNavigate();
  const lsKey = 'results';

  useEffect(() => {
    // Handles refreshing.
    if (state.status === 'start') {
      navigate('/');
    }
  }, [state.status]);

  // Get history of results from localStorage on pageload.
  useEffect(() => {
    //if (localStorage.getItem())
    const cachedData = localStorage.getItem(lsKey);
    const cachedScore = cachedData ? JSON.parse(cachedData) : null;
    const currentScore: IScore = {
      correct: state?.data?.score,
      count: state?.data?.questionList?.length,
      timeStamp: Date.now(),
    };
    if (cachedScore) {
      if (cachedScore.correct > currentScore.correct) {
        setHighScore(cachedScore);
      } else if (cachedScore.correct < currentScore.correct) {
        setHighScore(currentScore);
        localStorage.setItem(lsKey, JSON.stringify(currentScore));
      } else {
        // Let's use the most recent score if the correct totals are equal.
        setHighScore(currentScore);
        localStorage.setItem(lsKey, JSON.stringify(currentScore));
      }
    } else {
      setHighScore(currentScore);
      localStorage.setItem(lsKey, JSON.stringify(currentScore));
    }
  }, []);

  return (
    <ContentWrapper>
      <iframe
        src="https://giphy.com/embed/26u4lOMA8JKSnL9Uk"
        width="100%"
        frameBorder="0"
        allowFullScreen
      ></iframe>
      <Text element="h1" textStyle="heading">
        You're a Trivia master!
      </Text>
      <Text>
        You got {state?.data?.score} out of {state?.data?.questionList?.length}{' '}
        right!
      </Text>
      <Text>
        You best score so far was {highScore.correct} out of {highScore.count}{' '}
        which you got on {formatDate(highScore.timeStamp)}.
      </Text>
      <StyledButton onClick={() => clickHandler(dispatch, navigate)}>
        Try Again!
      </StyledButton>
    </ContentWrapper>
  );
};

export default Results;
