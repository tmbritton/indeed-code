import QuizReducer, { initalQuizState } from './reducers';
import questionData from './questionData';

test('Reducer should transition from idle to selected when sent a selectAnswer action.', () => {
  const state = {
    status: 'idle',
  };

  const expectedState = {
    status: 'selected',
    action: [],
  };

  expect(QuizReducer(state, { type: 'selectAnswer' })).toEqual(expectedState);
});

test('Reducer should return default state when handling any action other than selectedAnswer in idle state', () => {
  const actions = [
    { type: 'startTimer' },
    { type: 'resetTimer' },
    { type: 'stopTimer' },
    { type: 'timeOut' },
    { type: 'forceSubmission' },
    { type: 'submitAnswer', payload: { chosenAnswerList: [] } },
    { type: 'continue' },
    { type: 'loadQuestions' },
  ];
  actions.forEach((action) => {
    expect(QuizReducer(initalQuizState, action)).toEqual(initalQuizState);
  });
});

test('When in selected status, reducer should transition to correct status when given a correct answer', () => {
  const state = {
    status: 'selected',
    action: [],
    data: {
      currentQuestionIndex: 0,
      questionList: questionData,
    },
  };

  const expectedState = {
    status: 'correct',
    action: [{ type: 'stopTimer' }],
    data: {
      currentQuestionIndex: 0,
      questionList: questionData,
      submittedAnswerMap: {
        [questionData[0].id]: questionData[0].correctAnswerKeyList,
      },
    },
  };
  expect(
    QuizReducer(state, {
      type: 'submitAnswer',
      payload: { chosenAnswerList: questionData[0].correctAnswerKeyList },
    })
  ).toEqual(expectedState);
});

test('When in selected status, reducer should transition to tryagain status when given an incorrect answer and there are attempts left', () => {
  const state = {
    status: 'selected',
    action: [],
    data: {
      attemptCount: 1,
      currentQuestionIndex: 0,
      questionList: questionData,
    },
  };

  const expectedState = {
    status: 'tryagain',
    action: [{ type: 'resetTimer' }],
    data: {
      attemptCount: 2,
      currentQuestionIndex: 0,
      questionList: questionData,
      submittedAnswerMap: {
        [questionData[0].id]: ['foo'],
      },
    },
  };

  expect(
    QuizReducer(state, {
      type: 'submitAnswer',
      payload: { chosenAnswerList: ['foo'] },
    })
  ).toEqual(expectedState);
});

test('When in selected status, reducer should transition to incorrect status when an incorrect answer is given and there are no more attempts left.', () => {
  const state = {
    status: 'selected',
    action: [],
    data: {
      attemptCount: 2,
      currentQuestionIndex: 0,
      questionList: questionData,
    },
  };

  const expectedState = {
    status: 'incorrect',
    action: [{ type: 'stopTimer' }],
    data: {
      attemptCount: 2,
      currentQuestionIndex: 0,
      questionList: questionData,
      submittedAnswerMap: {
        [questionData[0].id]: ['foo'],
      },
    },
  };

  expect(
    QuizReducer(state, {
      type: 'submitAnswer',
      payload: { chosenAnswerList: ['foo'] },
    })
  ).toEqual(expectedState);
});

test('When in correct status and there are more questions a continue action should transition to idle status', () => {
  const state = {
    status: 'correct',
    action: [{ type: 'stopTimer' }],
    data: {
      currentQuestionIndex: 0,
      questionList: questionData,
      submittedAnswerMap: {
        [questionData[0].id]: questionData[0].correctAnswerKeyList,
      },
    },
  };

  const expectedState = {
    status: 'idle',
    action: [{ type: 'startTimer' }],
    data: {
      currentQuestionIndex: 1,
      questionList: questionData,
      submittedAnswerMap: {
        [questionData[0].id]: questionData[0].correctAnswerKeyList,
      },
    },
  };

  expect(
    QuizReducer(state, {
      type: 'continue',
    })
  ).toEqual(expectedState);
});

test('When in correct status and there are no more questions a continue action should result in a goToResults action in the reducer.', () => {
  const state = {
    status: 'correct',
    action: [{ type: 'stopTimer' }],
    data: {
      currentQuestionIndex: questionData.length - 1,
      questionList: questionData,
    },
  };

  const expectedState = {
    status: 'correct',
    action: [{ type: 'goToResults' }],
    data: {
      currentQuestionIndex: questionData.length - 1,
      questionList: questionData,
    },
  };

  expect(
    QuizReducer(state, {
      type: 'continue',
    })
  ).toEqual(expectedState);
});

test('When in incorrect status and there are no more questions a continue action should result in a goToResults action in the reducer.', () => {
  const state = {
    status: 'incorrect',
    data: {
      currentQuestionIndex: questionData.length - 1,
      questionList: questionData,
    },
  };

  const expectedState = {
    status: 'incorrect',
    action: [{ type: 'goToResults' }],
    data: {
      currentQuestionIndex: questionData.length - 1,
      questionList: questionData,
    },
  };

  expect(
    QuizReducer(state, {
      type: 'continue',
    })
  ).toEqual(expectedState);
});

test('When in incorrect status and there are more questions a continue action should transition to idle status', () => {
  const state = {
    status: 'incorrect',
    action: [{ type: 'stopTimer' }],
    data: {
      currentQuestionIndex: 0,
      questionList: questionData,
    },
  };

  const expectedState = {
    status: 'idle',
    action: [{ type: 'startTimer' }],
    data: {
      currentQuestionIndex: 1,
      questionList: questionData,
    },
  };

  expect(
    QuizReducer(state, {
      type: 'continue',
    })
  ).toEqual(expectedState);
});

test('When in tryagain status and a selectAnswer action in sent to reducer the state should transition to selected', () => {
  const state = {
    status: 'tryagain',
    action: [{ type: 'resetTimer' }],
  };

  const expectedState = {
    status: 'selected',
    action: [],
  };
  expect(
    QuizReducer(state, {
      type: 'selectAnswer',
    })
  ).toEqual(expectedState);
});
