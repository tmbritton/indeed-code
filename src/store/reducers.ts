import { combineReducers } from 'redux';
import { IQuizState, Action } from '../../types';
import questionData from './questionData';
import { isAnswerCorrect, getStateAfterSubmittingAnswer } from '../utils';

const initalQuizState: IQuizState = {
  status: 'start',
  action: [],
  data: {
    attemptCount: 1,
    currentQuestionIndex: 0,
    questionList: questionData,
    score: 0,
    selectedAnswers: [],
    submittedAnswerMap: {},
    timeLeft: questionData?.[0]?.allowedTime,
  },
};

/**
 * Handle timer tick in own function because it's the same across multiple reducer functions.
 * @param state Application state
 * @returns
 */
const timerTickHandler = (state: IQuizState): IQuizState => {
  const timeLeft = state?.data?.timeLeft;
  return {
    ...state,
    status: timeLeft === 0 ? 'selected' : state?.status,
    action: timeLeft === 0 ? [{ type: 'forceSubmission' }] : [],
    data: {
      ...state.data,
      timeLeft: timeLeft === 0 ? 0 : timeLeft - 1,
    },
  };
};

/**
 * Handle actions when the machine status is idle.
 * @param state
 * @param action
 * @returns
 */
const idleReducer = (state: IQuizState, action: Action): IQuizState => {
  switch (action?.type) {
    case 'selectAnswer':
      return {
        ...state,
        status: 'selected',
        action: [],
        data: {
          ...state?.data,
          selectedAnswers: action?.payload?.selections,
        },
      };
    case 'timerTick':
      return timerTickHandler(state);
  }
  return state;
};

/**
 * Handle actions when the machine status is selected.
 * @param state
 * @param action
 * @returns states
 */
const selectedReducer = (state: IQuizState, action: Action): IQuizState => {
  if (action?.type === 'selectAnswer') {
    return {
      ...state,
      data: {
        ...state?.data,
        selectedAnswers: action?.payload?.selections,
      },
    };
  }
  if (action?.type === 'submitAnswer') {
    const currentIndex = state?.data?.currentQuestionIndex;
    const currentQuestion = state?.data?.questionList[currentIndex];
    const isCorrect = isAnswerCorrect(
      currentQuestion?.correctAnswerKeyList,
      action?.payload?.selections
    );
    const hasAttemptsLeft =
      state?.data?.attemptCount < currentQuestion?.allowedAttemptCount;
    const nextStatus = getStateAfterSubmittingAnswer(
      isCorrect,
      hasAttemptsLeft
    );
    return {
      ...state,
      status: nextStatus,
      data: {
        ...state?.data,
        attemptCount:
          nextStatus === 'tryagain'
            ? state?.data?.attemptCount + 1
            : state?.data?.attemptCount,
        score:
          // Only increase score if answer is correct.
          nextStatus === 'correct'
            ? state?.data?.score + 1
            : state?.data?.score,
        submittedAnswerMap: {
          ...state?.data?.submittedAnswerMap,
          [state?.data?.questionList?.[currentIndex]?.id]:
            action?.payload?.selections,
        },
        timeLeft:
          nextStatus === 'tryagain'
            ? currentQuestion?.allowedTime
            : state?.data?.timeLeft,
      },
    };
  }
  if (action?.type === 'timerTick') {
    return timerTickHandler(state);
  }
  return state;
};

/**
 * Handle actions when the machine status is correct or incorrect. Currently the same logic
 * works for both correct and incorrect statuses.
 * @param state
 * @param action
 * @returns state
 */
const correctReducer = (state: IQuizState, action: Action): IQuizState => {
  if (action?.type === 'continue') {
    const hasMoreQuestions =
      state?.data?.currentQuestionIndex < state?.data?.questionList?.length - 1;
    return {
      ...state,
      status: hasMoreQuestions ? 'idle' : 'done',
      action: hasMoreQuestions ? [] : [{ type: 'goToResults' }],
      data: {
        ...state.data,
        attemptCount: hasMoreQuestions ? 1 : state?.data?.attemptCount,
        currentQuestionIndex: hasMoreQuestions
          ? state?.data?.currentQuestionIndex + 1
          : state?.data?.currentQuestionIndex,
        timeLeft: hasMoreQuestions
          ? state?.data?.questionList?.[state?.data?.currentQuestionIndex + 1]
              ?.allowedTime
          : state?.data?.timeLeft,
        selectedAnswers: [],
      },
    };
  }
  return state;
};

const tryagainReducer = (state: IQuizState, action: Action): IQuizState => {
  const timeLeft = state?.data?.timeLeft;
  if (action?.type === 'selectAnswer') {
    return {
      ...state,
      status: 'selected',
      action: [],
      data: {
        ...state?.data,
        selectedAnswers: action?.payload?.selections,
      },
    };
  }
  if (action?.type === 'timerTick') {
    return timerTickHandler(state);
  }
  return state;
};

const doneReducer = (state: IQuizState, action: Action): IQuizState => {
  if (action?.type === 'playAgain') {
    return {
      ...initalQuizState,
    };
  }
  return state;
};

const startReducer = (state: IQuizState, action: Action): IQuizState => {
  if (action?.type === 'begin') {
    return {
      ...state,
      status: 'idle',
    };
  }
  return state;
};

/**
 * Switch on state.status to explicity create a state machine with the reducer
 * as recommended in Redux style guide.
 * @see https://redux.js.org/style-guide#treat-reducers-as-state-machines
 * @param state IQuizState
 * @param action Action
 * @returns IQuizstate
 */
const quizReducer = (
  state: IQuizState = initalQuizState,
  action: Action
): IQuizState => {
  switch (state.status) {
    case 'idle':
      state = idleReducer(state, action);
      break;
    case 'selected':
      state = selectedReducer(state, action);
      break;
    case 'correct':
      state = correctReducer(state, action);
      break;
    case 'incorrect':
      state = correctReducer(state, action);
      break;
    case 'tryagain':
      state = tryagainReducer(state, action);
      break;
    case 'done':
      state = doneReducer(state, action);
      break;
    case 'start':
      state = startReducer(state, action);
  }
  return state;
};

export default combineReducers({ quiz: quizReducer });
export { initalQuizState };
