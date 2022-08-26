import { FC, Dispatch, useState, useEffect } from 'react';
import styled from '@emotion/styled';
import { useQuizContext } from '../providers/QuizContextProvider';
import { Action } from '../../types';
import { useNavigate, NavigateFunction } from 'react-router';
import Text from '../components/Text';
import Button from '../components/Button';
import { ContentWrapper } from '../components/LayoutComponents';
import Input from '../components/Input';
import { getSelectedState } from '../utils';
import { QuizStatus } from '../../types';

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
  if (status === 'selected' || status === 'idle') {
    return 'Check Answer';
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
  const [state, dispatch] = useQuizContext();
  const navigate = useNavigate();
  const index = state?.data?.currentQuestionIndex;
  const question = state?.data?.questionList?.[index];
  const allowMultipleAnswers = question?.correctAnswerKeyList?.length > 1;
  const hasMoreQuestions =
    state.data.questionList.length - 1 > state.data.currentQuestionIndex;
  const selected = state?.data?.selectedAnswers;

  /**
   * Handle reducer status changes.
   */
  useEffect(() => {
    // Handles going to start screen on refresh.
    if (state.status === 'start') {
      navigate('/');
    }
  }, [state.status]);

  useEffect(() => {
    if (state.action.length) {
      state.action.forEach((action) => {
        if (action.type === 'goToResults') {
          navigate('/results');
        }
      });
    }
  }, [state.action]);

  return (
    <QuizWrapper>
      <TitleWrapper>
        <Text textStyle="heading2" element="h1">
          Question {state?.data?.currentQuestionIndex + 1} of{' '}
          {state?.data?.questionList?.length}
        </Text>
        <Text textStyle="heading2" element="p">
          Score: {state?.data?.score}
        </Text>
      </TitleWrapper>
      <QuestionText>{question?.questionText}</QuestionText>
      {allowMultipleAnswers ? (
        <Text textStyle="italic" color="deemphasize">
          Please select all that apply.
        </Text>
      ) : null}
      <AnswerOptionsWrap>
        {question.answerOptionList.map((option, index) => {
          return (
            <Input
              onClick={(value) =>
                optionClickHandler(
                  value,
                  selected,
                  allowMultipleAnswers,
                  dispatch
                )
              }
              key={option?.id}
              value={option?.id}
              checked={selected.includes(option.id)}
            >
              {option.answerText}
            </Input>
          );
        })}
      </AnswerOptionsWrap>
      {state.status === 'correct' ? (
        <Text textStyle="feedback" color="success">
          You got it right!
        </Text>
      ) : null}
      {state.status === 'incorrect' || state.status === 'tryagain' ? (
        <Text textStyle="feedback" color="failure">
          You got it wrong ☹️
        </Text>
      ) : null}
      {state?.data?.attemptCount > 1 ? (
        <Text textStyle="italic" color="deemphasize">
          Hint: {question.hintText}
        </Text>
      ) : null}
      <ButtonWrap>
        <Text textStyle="italic" color="deemphasize" element="p">
          Attempt {state?.data?.attemptCount} / {question.allowedAttemptCount}
        </Text>
        <Button
          disabled={isButtonDisabled(state.status)}
          onClick={() => buttonClickHandler(state.status, dispatch, selected)}
        >
          {getButtonText(state.status, hasMoreQuestions)}
        </Button>
      </ButtonWrap>
    </QuizWrapper>
  );
};

export default Quiz;
