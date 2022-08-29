import { FC, Dispatch, useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { useNavigate, NavigateFunction } from 'react-router';
import { ContentWrapper } from '../components/LayoutComponents';
import Text from '../components/Text';
import Button from '../components/Button';
import theme from '../theme';
import { Action, IScore } from '../../types';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import {
  selectStatus,
  selectScore,
  selectQuestionList,
} from '../store/selectors';

const messageList = [
  'Did you even try?',
  "I'm sure you have other talents.",
  "You'll get it next time!",
  'Hey! Pretty good!',
  "You're a Trivia master!",
];

const StyledButton = styled(Button)`
  margin-top: auto;
  @media (min-width: ${theme.breakpoints.sm}) {
    margin-top: 1.5rem;
    align-self: center;
  }
`;

const formatDate = (timeStamp: number): string => {
  const date = new Date(timeStamp);
  return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
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
  const dispatch = useAppDispatch();
  const [highScore, setHighScore] = useState<IScore>({
    correct: 0,
    count: 0,
    timeStamp: 0,
  });
  const navigate = useNavigate();
  const lsKey = 'results';
  const score = useAppSelector(selectScore);
  const questionList = useAppSelector(selectQuestionList);
  const status = useAppSelector(selectStatus);

  useEffect(() => {
    // Handles refreshing.
    if (status === 'start') {
      navigate('/');
    }
  }, [status]);

  // Get high score from localStorage on pageload.
  useEffect(() => {
    const cachedData = localStorage.getItem(lsKey);
    const cachedScore = cachedData ? JSON.parse(cachedData) : null;
    const currentScore: IScore = {
      correct: score,
      count: questionList.length,
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
      <img
        src="http://placekitten.com/200/300"
        alt="Kitten photo"
        width="200"
        height="300"
        style={{ margin: '0 auto' }}
      />
      <Text element="h1" textStyle="heading">
        {messageList[score]}
      </Text>
      <Text>
        You got {score} out of {questionList?.length} right!
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
