import { IQuizState, Action } from "../../types";
import questionData from "./questionData";
import { isAnswerCorrect, getStateAfterSubmittingAnswer } from "../utils";

const initalQuizState: IQuizState = {
  status: 'idle',
  action: [
    { type: 'startTimer' }
  ],
  data: {
    attemptCount: 1,
    currentQuestionIndex: 0,
    questionList: questionData,
    submittedAnswerMap: {}
  }
}

/**
 * Handle actions when the machine status is idle.
 * @param state 
 * @param action 
 * @returns 
 */
const idleReducer = (state: IQuizState, action: Action): IQuizState => {
  switch(action.type) {
    case 'selectAnswer':
      return {
        ...state,
        status: 'selected',
        action: [],
      }
  }
  return state;
}

/**
 * Handle actions when the machine status is selected.
 * @param state 
 * @param action 
 * @returns 
 */
const selectedReducer = (state: IQuizState, action: Action): IQuizState => {
  if (action?.type === 'submitAnswer') {
    const currentIndex = state?.data?.currentQuestionIndex;
    const currentQuestion = state?.data?.questionList[currentIndex];
    const isCorrect = isAnswerCorrect(currentQuestion?.correctAnswerKeyList, action?.payload?.chosenAnswerList);
    const hasAttemptsLeft = state?.data?.attemptCount > currentQuestion?.allowedAttemptCount;
    return {
      ...state,
      status: getStateAfterSubmittingAnswer(isCorrect, hasAttemptsLeft),
      action: [{type: 'stopTimer'}],
      data: {
        ...state.data,
        submittedAnswerMap: {
          ...state.data.submittedAnswerMap,
          [state.data.questionList[currentIndex].id]: action.payload.chosenAnswerList
        }
      }
    }
  }
  return state;
}

/**
 * Switch on state.status to move the machine state to the top level in order
 * to explicity create a state machine as recommended in Redux style guide.
 * @see https://redux.js.org/style-guide#treat-reducers-as-state-machines
 * @param state IQuizState
 * @param action Action
 * @returns IQuizstate
 */
const quizReducer = (state: IQuizState, action: Action): IQuizState => {
  switch(state.status) {
    case 'idle':
      state = idleReducer(state, action);
      break;
    case 'selected':
      state = selectedReducer(state, action);
      break;
    case 'correct':
      break;
    case 'incorrect':
      break;
    case 'tryagain':
      break;
  }
  return state;
}

export default quizReducer;
export { initalQuizState }