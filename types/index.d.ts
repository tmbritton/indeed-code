declare module '*.svg' {
  const ReactComponent: React.StatelessComponent<
    React.SVGAttributes<SVGElement>
  >;
  export { ReactComponent };
}

/**
 * States for the finite state of the state machine defined in the reducer.
 */
export type QuizStatus =
  | 'start'
  | 'idle'
  | 'selected'
  | 'correct'
  | 'tryagain'
  | 'correct'
  | 'incorrect'
  | 'done';

/**
 * Actions that can be sent to the reducer or sent from the reducer to be handled in a useEffects hook.
 */
export type Action =
  | { type: 'startTimer' }
  | { type: 'resetTimer' }
  | { type: 'stopTimer' }
  | { type: 'timeOut' }
  | { type: 'forceSubmission' }
  | { type: 'selectAnswer'; payload: { selections: string[] } }
  | { type: 'submitAnswer'; payload: { selections: string[] } }
  | { type: 'continue' }
  | { type: 'loadQuestions' }
  | { type: 'goToResults' }
  | { type: 'playAgain' }
  | { type: 'begin' };

export interface IAnswerOption {
  id: string;
  answerText: string;
}

export interface IQuestion {
  id: string;
  allowedAttemptCount: number;
  allowedTime: number;
  answerOptionList: IAnswerOption[];
  correctAnswerKeyList: string[];
  hintText: string;
  questionText: string;
}

export interface IQuizState {
  status: QuizStatus;
  action: Action[] | [];
  data: {
    attemptCount: number;
    currentQuestionIndex: number;
    questionList: IQuestion[];
    score: number;
    selectedAnswers: string[];
    submittedAnswerMap: {
      [questionId: string]: string[];
    };
  };
}

export interface IScore {
  correct: number;
  count: number;
  timeStamp: number;
}
