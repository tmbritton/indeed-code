declare module "*.svg" {
  const ReactComponent: React.StatelessComponent<React.SVGAttributes<
    SVGElement
  >>;
  export { ReactComponent };
}

/**
 * States for the finite state of the state machine defined in the reducer.
 */
export type QuizStatus = 'idle' | 'selected' | 'correct' | 'tryagain' | 'correct' | 'incorrect';

/**
 * Actions that can be sent to the reducer or sent from the reducer to be handled in a useEffects hook.
 */
export type Action = 
  | { type: 'startTimer', payload: undefined } 
  | { type: 'resetTimer', payload: undefined }
  | { type: 'stopTimer', payload: undefined }
  | { type: 'timeOut', payload: undefined }
  | { type: 'forceSubmission', payload: undefined }
  | { type: 'selectAnswer', payload: { answerId: string }}
  | { type: 'submitAnswer', payload: { chosenAnswerList: string[] }}
  | { type: 'continue', payload: undefined }

export interface IAnswerOption {
  id: string,
  answerText: string,
};

export interface IQuestion {
  id: string,
  allowedAttemptCount: number,
  answerOptionList: IAnswerOption[],
  correctAnswerKeyList: string[],
  hintText: string,
  questionText: string,
};

export interface IQuizState {
  status: QuizStatus,
  action?: ActionType,
  data: {
    attemptCount: number,
    currentQuestionIndex: number,
    questionList: IQuestion[],
    submittedAnswerMap: {
      [questionId: string]: string[],
    },
  },
};
