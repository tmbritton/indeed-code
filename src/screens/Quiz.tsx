import { FC, Dispatch, useEffect } from 'react';
import styled from '@emotion/styled';
import { Action } from '../../types';
import { useNavigate } from 'react-router';
import Text from '../components/Text';
import Button from '../components/Button';
import { ContentWrapper } from '../components/LayoutComponents';
import Input from '../components/Input';
import { getSelectedState } from '../utils';
import { QuizStatus } from '../../types';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import {
  selectScore,
  selectStatus,
  selectActionList,
  selectCurrentIndex,
  selectCurrentQuestion,
  selectAllowMultipleAnswers,
  selectHasMoreQuestions,
  selectSelectedAnswers,
  selectQuestionList,
  selectAttemptCount,
  selectTimeRemaining,
} from '../store/selectors';

const TitleWrapper = styled('div')`
  display: flex;
  flex-direction: column;
  text-align: left;
`;

const QuestionText = styled(Text)`
  text-align: left;
`;

const AnswerOptionsWrap = styled('div')`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const QuizWrapper = styled(ContentWrapper)`
  && {
    text-align: left;
  }
`;

const ButtonWrap = styled('div')`
  display: flex;
  flex-direction: column;
  margin-top: auto;
`;

/**
 * Handle clicking on answer options.
 * @param value
 * @param selected
 * @param multipleAllowed
 * @param dispatch
 */
const optionClickHandler = (
  value: string,
  selected: string[],
  multipleAllowed: boolean,
  dispatch: Dispatch<Action>
) => {
  const newValue = getSelectedState(selected, value, multipleAllowed);
  dispatch({ type: 'selectAnswer', payload: { selections: newValue } });
};

/**
 * Get submit button text depending on status and questions left.
 * @param status
 * @param hasMoreQuestions
 * @returns
 */
const getButtonText = (status: QuizStatus, hasMoreQuestions: boolean) => {
  if (status === 'selected' || status === 'idle' || status === 'tryagain') {
    return 'Submit Answer';
  }
  if (status === 'incorrect' || status === 'correct') {
    if (hasMoreQuestions) {
      return 'Next Question';
    }
    return 'Go To Results';
  }
  // Default that shouldn't occur.
  return 'Continue';
};

/**
 * Determine if button is disabled depending on reducer status.
 * @param status QuizStatus
 * @returns
 */
const isButtonDisabled = (status: QuizStatus) => {
  if (status === 'selected' || status === 'correct' || status === 'incorrect') {
    return false;
  }
  return true;
};

/**
 * Button click handler. Callback behavior depends on reducer status.
 * @param status
 * @param dispatch
 * @param selections
 */
const buttonClickHandler = (
  status: QuizStatus,
  dispatch: Dispatch<Action>,
  selections?: string[]
) => {
  if (status === 'selected' && selections && selections.length) {
    dispatch({
      type: 'submitAnswer',
      payload: { selections: selections },
    });
  }
  if (status === 'correct' || status === 'incorrect') {
    dispatch({
      type: 'continue',
    });
  }
};

const Quiz: FC<{}> = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const score = useAppSelector(selectScore);
  const status = useAppSelector(selectStatus);
  const actionList = useAppSelector(selectActionList);
  const currentIndex = useAppSelector(selectCurrentIndex);
  const currentQuestion = useAppSelector(selectCurrentQuestion);
  const allowMultipleAnswers = useAppSelector(selectAllowMultipleAnswers);
  const hasMoreQuestions = useAppSelector(selectHasMoreQuestions);
  const selectedAnswers = useAppSelector(selectSelectedAnswers);
  const questionList = useAppSelector(selectQuestionList);
  const attemptCount = useAppSelector(selectAttemptCount);
  const timeRemaining = useAppSelector(selectTimeRemaining);

  /**
   * Set timer on initial screen load.
   */
  useEffect(() => {
    const timer = window.setInterval(() => {
      dispatch({ type: 'timerTick' });
    }, 1000);
    return () => {
      window.clearInterval(timer);
    };
  }, []);

  /**
   * Handle reducer status changes.
   */
  useEffect(() => {
    // Handles going to start screen on refresh.
    if (status === 'start') {
      navigate('/');
    }
  }, [status]);

  /**
   * Handle actions sent from the reducer.
   */
  useEffect(() => {
    if (actionList.length) {
      actionList.forEach((action) => {
        if (action.type === 'goToResults') {
          navigate('/results');
        }
        if (action.type === 'forceSubmission') {
          dispatch({
            type: 'submitAnswer',
            payload: { selections: selectedAnswers },
          });
        }
      });
    }
  }, [actionList]);

  return (
    <QuizWrapper>
      <TitleWrapper>
        <Text textStyle="heading2" element="h1">
          Question {currentIndex + 1} of {questionList?.length}
        </Text>
        <Text textStyle="heading2" element="p">
          Score: {score}
        </Text>
      </TitleWrapper>
      <QuestionText>{currentQuestion?.questionText}</QuestionText>
      {allowMultipleAnswers ? (
        <Text textStyle="italic" color="deemphasize">
          Please select all that apply.
        </Text>
      ) : null}
      <AnswerOptionsWrap role="radiogroup">
        {currentQuestion.answerOptionList.map((option, index) => {
          return (
            <Input
              onClick={(value) =>
                optionClickHandler(
                  value,
                  selectedAnswers,
                  allowMultipleAnswers,
                  dispatch
                )
              }
              key={option?.id}
              value={option?.id}
              checked={selectedAnswers.includes(option.id)}
              disabled={status === 'correct' || status === 'incorrect'}
              id={option?.id}
            >
              {option.answerText}
            </Input>
          );
        })}
      </AnswerOptionsWrap>
      {status === 'correct' ? (
        <Text textStyle="feedback" color="success">
          You got it right!
        </Text>
      ) : null}
      {status === 'incorrect' || status === 'tryagain' ? (
        <Text textStyle="feedback" color="failure">
          You got it wrong ☹️
        </Text>
      ) : null}
      {attemptCount > 1 ? (
        <Text textStyle="italic" color="deemphasize">
          Hint: {currentQuestion.hintText}
        </Text>
      ) : null}
      <ButtonWrap>
        <Text textStyle="italic" color="deemphasize" element="p">
          Attempt {attemptCount} / {currentQuestion.allowedAttemptCount}
        </Text>
        <Text color="deemphasize" element="p">
          Timer: {timeRemaining}
        </Text>
        <Button
          disabled={isButtonDisabled(status)}
          onClick={() => buttonClickHandler(status, dispatch, selectedAnswers)}
        >
          {getButtonText(status, hasMoreQuestions)}
        </Button>
      </ButtonWrap>
    </QuizWrapper>
  );
};

export default Quiz;
