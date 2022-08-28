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
  },
};

/**
 * Handle actions when the machine status is idle.
 * @param state
 * @param action
 * @returns
 */
const idleReducer = (state: IQuizState, action: Action): IQuizState => {
  switch (action.type) {
    case 'selectAnswer':
      return {
        ...state,
        status: 'selected',
        action: [],
        data: {
          ...state.data,
          selectedAnswers: action.payload.selections,
        },
      };
    case 'timeOut':
      return {
        ...state,
        action: [{ type: 'forceSubmission' }],
      };
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
        ...state.data,
        selectedAnswers: action.payload.selections,
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
      action: [
        { type: nextStatus === 'tryagain' ? 'resetTimer' : 'stopTimer' },
      ],
      data: {
        ...state.data,
        attemptCount:
          nextStatus === 'tryagain'
            ? state.data.attemptCount + 1
            : state.data.attemptCount,
        score:
          // Only increase score if answer is correct.
          nextStatus === 'correct'
            ? state?.data?.score + 1
            : state?.data?.score,
        submittedAnswerMap: {
          ...state.data.submittedAnswerMap,
          [state.data.questionList[currentIndex].id]: action.payload.selections,
        },
      },
    };
  }
  if (action?.type === 'timeOut') {
    return {
      ...state,
      action: [{ type: 'forceSubmission' }],
    };
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
      action: [{ type: hasMoreQuestions ? 'startTimer' : 'goToResults' }],
      data: {
        ...state.data,
        attemptCount: hasMoreQuestions ? 1 : state?.data?.attemptCount,
        currentQuestionIndex: hasMoreQuestions
          ? state?.data?.currentQuestionIndex + 1
          : state?.data?.currentQuestionIndex,
      },
    };
  }
  return state;
};

const tryagainReducer = (state: IQuizState, action: Action): IQuizState => {
  if (action?.type === 'selectAnswer') {
    return {
      ...state,
      status: 'selected',
      action: [],
      data: {
        ...state.data,
        selectedAnswers: action?.payload?.selections,
      },
    };
  }
  return state;
};

const doneReducer = (state: IQuizState, action: Action): IQuizState => {
  if (action.type === 'playAgain') {
    return {
      ...initalQuizState,
    };
  }
  return state;
};

const startReducer = (state: IQuizState, action: Action): IQuizState => {
  if (action.type === 'begin') {
    return {
      ...state,
      status: 'idle',
      action: [{ type: 'startTimer' }],
    };
  }
  return state;
};

/**
 * Switch on state.status to move the machine state to the top level in order
 * to explicity create a state machine as recommended in Redux style guide.
 * @see https://redux.js.org/style-guide#treat-reducers-as-state-machines
 * @param state IQuizState
 * @param action Action
 * @returns IQuizstate
 */
const quizReducer = (state: IQuizState, action: Action): IQuizState => {
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

export default quizReducer;
export { initalQuizState };
