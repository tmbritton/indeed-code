import QuizReducer, { initalQuizState } from './reducers';
import { RootState } from '.';
import { Action } from '../../types';
import questionData from './questionData';

const initialRootState: RootState = {
  quiz: {
    ...initalQuizState,
  },
};

test('Reducer should transition from idle to selected when sent a selectAnswer action.', () => {
  const state: RootState = {
    ...initialRootState,
    quiz: {
      ...initialRootState.quiz,
      status: 'idle',
    },
  };

  const expectedState: RootState = {
    ...initialRootState,
    quiz: {
      ...initialRootState.quiz,
      status: 'selected',
      action: [],
      data: {
        ...initialRootState.quiz.data,
        selectedAnswers: ['foo'],
      },
    },
  };

  expect(
    QuizReducer(state, {
      type: 'selectAnswer',
      payload: { selections: ['foo'] },
    })
  ).toEqual(expectedState);
});

test('Reducer should return default state when handling any action other than selectedAnswer in idle state', () => {
  const actions: Action[] = [
    { type: 'forceSubmission' },
    { type: 'submitAnswer', payload: { selections: [] } },
    { type: 'continue' },
    { type: 'loadQuestions' },
  ];
  actions.forEach((action: Action) => {
    expect(QuizReducer(initialRootState, action)).toEqual(initialRootState);
  });
});

test('When in selected status, reducer should save selected answers', () => {
  const state: RootState = {
    ...initialRootState,
    quiz: {
      ...initialRootState.quiz,
      status: 'selected',
      data: {
        ...initialRootState.quiz.data,
        selectedAnswers: [],
      },
    },
  };

  const expectedState: RootState = {
    ...initialRootState,
    quiz: {
      ...initialRootState.quiz,
      status: 'selected',
      action: [],
      data: {
        ...initialRootState.quiz.data,
        selectedAnswers: ['foo', 'bar'],
      },
    },
  };
  expect(
    QuizReducer(state, {
      type: 'selectAnswer',
      payload: { selections: ['foo', 'bar'] },
    })
  ).toEqual(expectedState);
});

test('When in selected status, reducer should transition to correct status when given a correct answer', () => {
  const state: RootState = {
    ...initialRootState,
    quiz: {
      ...initialRootState.quiz,
      status: 'selected',
      action: [],
      data: {
        ...initialRootState.quiz.data,
        currentQuestionIndex: 0,
        score: 0,
      },
    },
  };

  const expectedState: RootState = {
    ...initialRootState,
    quiz: {
      ...initialRootState.quiz,
      status: 'correct',
      action: [],
      data: {
        ...initialRootState.quiz.data,
        currentQuestionIndex: 0,
        score: 1,
        submittedAnswerMap: {
          [questionData[0].id]: questionData[0].correctAnswerKeyList,
        },
      },
    },
  };

  expect(
    QuizReducer(state, {
      type: 'submitAnswer',
      payload: { selections: questionData[0].correctAnswerKeyList },
    })
  ).toEqual(expectedState);
});

test('When in selected status, reducer should transition to tryagain status when given an incorrect answer and there are attempts left', () => {
  const state: RootState = {
    ...initialRootState,
    quiz: {
      ...initialRootState.quiz,
      status: 'selected',
      action: [],
      data: {
        ...initialRootState.quiz.data,
        attemptCount: 1,
        currentQuestionIndex: 0,
        score: 1,
      },
    },
  };

  const expectedState: RootState = {
    ...initialRootState,
    quiz: {
      ...initialRootState.quiz,
      status: 'tryagain',
      action: [],
      data: {
        ...initialRootState.quiz.data,
        attemptCount: 2,
        currentQuestionIndex: 0,
        score: 1,
        submittedAnswerMap: {
          [questionData[0].id]: ['foo'],
        },
        timeLeft: questionData[0].allowedTime,
      },
    },
  };
  expect(
    QuizReducer(state, {
      type: 'submitAnswer',
      payload: { selections: ['foo'] },
    })
  ).toEqual(expectedState);
});

test('When in selected status, reducer should transition to incorrect status when an incorrect answer is given and there are no more attempts left.', () => {
  const state: RootState = {
    ...initialRootState,
    quiz: {
      ...initialRootState.quiz,
      status: 'selected',
      action: [],
      data: {
        ...initialRootState.quiz.data,
        attemptCount: 2,
        currentQuestionIndex: 0,
        score: 1,
      },
    },
  };

  const expectedState: RootState = {
    ...initialRootState,
    quiz: {
      ...initialRootState.quiz,
      status: 'incorrect',
      action: [],
      data: {
        ...initialRootState.quiz.data,
        attemptCount: 2,
        currentQuestionIndex: 0,
        score: 1,
        submittedAnswerMap: {
          [questionData[0].id]: ['foo'],
        },
      },
    },
  };

  expect(
    QuizReducer(state, {
      type: 'submitAnswer',
      payload: { selections: ['foo'] },
    })
  ).toEqual(expectedState);
});

test('When in correct status and there are more questions a continue action should transition to idle status', () => {
  const state: RootState = {
    ...initialRootState,
    quiz: {
      ...initialRootState.quiz,
      status: 'correct',
      action: [],
      data: {
        ...initialRootState.quiz.data,
        attemptCount: 2,
        currentQuestionIndex: 0,
        score: 1,
        submittedAnswerMap: {
          [questionData[0].id]: questionData[0].correctAnswerKeyList,
        },
        timeLeft: 7,
      },
    },
  };

  const expectedState: RootState = {
    ...initialRootState,
    quiz: {
      ...initialRootState.quiz,
      status: 'idle',
      action: [],
      data: {
        ...initialRootState.quiz.data,
        attemptCount: 1,
        currentQuestionIndex: 1,
        score: 1,
        submittedAnswerMap: {
          [questionData[0].id]: questionData[0].correctAnswerKeyList,
        },
        timeLeft: 15,
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
  const state: RootState = {
    ...initialRootState,
    quiz: {
      ...initialRootState.quiz,
      status: 'correct',
      action: [],
      data: {
        ...initialRootState.quiz.data,
        currentQuestionIndex: questionData.length - 1,
        score: 2,
      },
    },
  };

  const expectedState: RootState = {
    ...initialRootState,
    quiz: {
      ...initialRootState.quiz,
      status: 'done',
      action: [{ type: 'goToResults' }],
      data: {
        ...initialRootState.quiz.data,
        currentQuestionIndex: questionData.length - 1,
        score: 2,
      },
    },
  };

  expect(
    QuizReducer(state, {
      type: 'continue',
    })
  ).toEqual(expectedState);
});

test('When in incorrect status and there are no more questions a continue action should result in a goToResults action in the reducer.', () => {
  const state: RootState = {
    ...initialRootState,
    quiz: {
      ...initialRootState.quiz,
      status: 'incorrect',
      action: [],
      data: {
        ...initialRootState.quiz.data,
        attemptCount: 2,
        currentQuestionIndex: questionData.length - 1,
        score: 1,
        timeLeft: 12,
      },
    },
  };

  const expectedState: RootState = {
    ...initialRootState,
    quiz: {
      ...initialRootState.quiz,
      status: 'done',
      action: [{ type: 'goToResults' }],
      data: {
        ...initialRootState.quiz.data,
        attemptCount: 2,
        currentQuestionIndex: questionData.length - 1,
        score: 1,
        timeLeft: 12,
      },
    },
  };

  expect(
    QuizReducer(state, {
      type: 'continue',
    })
  ).toEqual(expectedState);
});

test('When in incorrect status and there are more questions a continue action should transition to idle status', () => {
  const state: RootState = {
    ...initialRootState,
    quiz: {
      ...initialRootState.quiz,
      status: 'incorrect',
      action: [],
      data: {
        ...initialRootState.quiz.data,
        attemptCount: 2,
        currentQuestionIndex: 0,
        timeLeft: 0,
      },
    },
  };

  const expectedState: RootState = {
    ...initialRootState,
    quiz: {
      ...initialRootState.quiz,
      status: 'idle',
      action: [],
      data: {
        ...initialRootState.quiz.data,
        attemptCount: 1,
        currentQuestionIndex: 1,
        timeLeft: 15,
      },
    },
  };

  expect(
    QuizReducer(state, {
      type: 'continue',
    })
  ).toEqual(expectedState);
});

test('When in tryagain status and a selectAnswer action in sent to reducer the state should transition to selected', () => {
  const state: RootState = {
    ...initialRootState,
    quiz: {
      ...initialRootState.quiz,
      status: 'tryagain',
    },
  };

  const expectedState: RootState = {
    ...initialRootState,
    quiz: {
      ...initialRootState.quiz,
      status: 'selected',
      data: {
        ...initialRootState.quiz.data,
        selectedAnswers: ['foo'],
      },
    },
  };

  expect(
    QuizReducer(state, {
      type: 'selectAnswer',
      payload: {
        selections: ['foo'],
      },
    })
  ).toEqual(expectedState);
});

test('When in done status a playAgain action should result in the reducer being in initial state.', () => {
  const state: RootState = {
    ...initialRootState,
    quiz: {
      ...initialRootState.quiz,
      status: 'done',
    },
  };

  expect(
    QuizReducer(state, {
      type: 'playAgain',
    })
  ).toEqual(initialRootState);
});

test('When in start status and a begin action is sent to the reducer it should transition to idle', () => {
  const expectedState: RootState = {
    ...initialRootState,
    quiz: {
      ...initialRootState.quiz,
      status: 'idle',
    },
  };

  expect(
    QuizReducer(initialRootState, {
      type: 'begin',
    })
  ).toEqual(expectedState);
});

test('When in idle state a timerTick action should decrement the time left.', () => {
  const state: RootState = {
    ...initialRootState,
    quiz: {
      ...initialRootState.quiz,
      status: 'idle',
      data: {
        ...initialRootState.quiz.data,
        timeLeft: 72,
      },
    },
  };

  const expectedState: RootState = {
    ...initialRootState,
    quiz: {
      ...initialRootState.quiz,
      status: 'idle',
      data: {
        ...initialRootState.quiz.data,
        timeLeft: 71,
      },
    },
  };

  expect(
    QuizReducer(state, {
      type: 'timerTick',
    })
  ).toEqual(expectedState);
});

test('When in selected state a timerTick action should decrement the time left.', () => {
  const state: RootState = {
    ...initialRootState,
    quiz: {
      ...initialRootState.quiz,
      status: 'selected',
      data: {
        ...initialRootState.quiz.data,
        timeLeft: 10,
      },
    },
  };

  const expectedState: RootState = {
    ...initialRootState,
    quiz: {
      ...initialRootState.quiz,
      status: 'selected',
      data: {
        ...initialRootState.quiz.data,
        timeLeft: 9,
      },
    },
  };
  expect(
    QuizReducer(state, {
      type: 'timerTick',
    })
  ).toEqual(expectedState);
});
