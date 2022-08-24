import { IQuizState, Action } from "../../types"

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
        action: null,
      }
  }
  return state;
}

const selectedReducer = (state: IQuizState, action: Action): IQuizState => {
  switch(action.type) {
    case 'submitAnswer':
      
      return {
        ...state,
        status: 'selected',
        action: null,
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
export {}