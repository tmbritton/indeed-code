import QuizReducer, {initalQuizState} from "./reducers";
import questionData from './questionData';

test('Reducer should transition from idle to selected when sent a selectAnswer action.', () => {
  const state = {
    status: 'idle',
  };

  const expectedState = {
    status: 'selected',
    action: []
  };

  expect(QuizReducer(state, { type: 'selectAnswer' })).toEqual(expectedState)
})

test('Reducer should return default state when handling any action other than selectedAnswer in idle state', () => {
  const actions = [
    { type: 'startTimer' },
    { type: 'resetTimer' },
    { type: 'stopTimer' },
    { type: 'timeOut' },
    { type: 'forceSubmission' },
    { type: 'submitAnswer', payload: { chosenAnswerList: [] }},
    { type: 'continue' },
    { type: 'loadQuestions' },
  ]
  actions.forEach(action => {
    expect(QuizReducer(initalQuizState, action)).toEqual(initalQuizState);
  })
})

test('When in selected status, reducer should transition to correct status when given a correct answer', () => {
  const state = {
    status: 'selected',
    action: [],
    data: {
      currentQuestionIndex: 0,
      questionList: questionData,
    }
  };

  const expectedState = {
    status: 'correct',
    action: [
      { type: 'stopTimer' }
    ],
    data: {
      currentQuestionIndex: 0,
      questionList: questionData,
      submittedAnswerMap: {
        [questionData[0].id]: questionData[0].correctAnswerKeyList
      }
    }
  }
  expect(QuizReducer(state, { type: 'submitAnswer', payload: { chosenAnswerList: questionData[0].correctAnswerKeyList }})).toEqual(expectedState);
})

test('When in selected status, reducer should transition to tryagain status when given an incorrect answer and there are attempts left', () => {
  const state = {
    status: 'selected',
    action: [],
    data: {
      attemptCount: 1,
      currentQuestionIndex: 0,
      questionList: questionData,
    }
  };

  const expectedState = {
    status: 'tryagain',
    action: [
      { type: 'resetTimer' }
    ],
    data: {
      attemptCount: 2,
      currentQuestionIndex: 0,
      questionList: questionData,
      submittedAnswerMap: {
        [questionData[0].id]: ['foo']
      }
    }
  }

  expect(QuizReducer(state, { type: 'submitAnswer', payload: { chosenAnswerList: ['foo'] }})).toEqual(expectedState);
})

test('When in selected status, reducer should transition to incorrect status in an incorrect answer is given and there are no more attempts left.', () => {
  
})