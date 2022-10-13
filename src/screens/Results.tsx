import { FC, Dispatch, useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { useNavigate, NavigateFunction } from 'react-router';
import { ContentWrapper } from '../components/LayoutComponents';
import Text from '../components/Text';
import Button from '../components/Button';
import Header from '../components/Header';
import Card from '../components/Card';
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
  'Double Plus Good!',
  "You're a Trivia master!",
];

const StyledButton = styled(Button)`
  margin-top: auto;
  @media (min-width: ${theme.breakpoints.sm}) {
    margin-top: 1.5rem;
    align-self: center;
  }
`;

const StyledHeading = styled(Text)`
  margin-top: 0.67rem;
`;

const formatDate = (timeStamp: number): string => {
  const date = new Date(timeStamp);
  return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
};

const getTextColorByScore = (
  score: number
): 'failure' | 'success' | 'informational' => {
  if (score <= 1) {
    return 'failure';
  } else if (score == 2 || score === 3) {
    return 'informational';
  } else {
    return 'success';
  }
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
    const currentScore: IScore = {
      correct: score,
      count: questionList.length,
      timeStamp: Date.now(),
    };
    try {
      const cachedData = localStorage?.getItem(lsKey);
      const cachedScore = cachedData ? JSON.parse(cachedData) : null;
      if (cachedScore) {
        if (cachedScore.correct > currentScore.correct) {
          setHighScore(cachedScore);
        } else if (cachedScore.correct < currentScore.correct) {
          setHighScore(currentScore);
          localStorage?.setItem(lsKey, JSON.stringify(currentScore));
        } else {
          // Let's use the most recent score if the correct totals are equal.
          setHighScore(currentScore);
          localStorage?.setItem(lsKey, JSON.stringify(currentScore));
        }
      } else {
        setHighScore(currentScore);
        localStorage?.setItem(lsKey, JSON.stringify(currentScore));
      }
    } catch (e) {
      setHighScore(currentScore);
    }
  }, []);

  return (
    <>
      <Header title="Results" />
      <ContentWrapper className="results">
        <Card
          imageUrl="http://placekitten.com/g/80/80"
          imageAlt="A kitten to view your results."
        >
          <StyledHeading element="h2" textStyle="heading2">
            {messageList[score]}
          </StyledHeading>
          <Text textStyle="italic" color={getTextColorByScore(score)}>
            You got {score} out of {questionList?.length} right!
          </Text>
          <Text>
            You best score so far was <strong>{highScore.correct}</strong> out
            of <strong>{highScore.count}</strong> which you got on{' '}
            <strong>{formatDate(highScore.timeStamp)}</strong>.
          </Text>
          <StyledButton onClick={() => clickHandler(dispatch, navigate)}>
            Try Again!
          </StyledButton>
        </Card>
      </ContentWrapper>
    </>
  );
};

export default Results;
