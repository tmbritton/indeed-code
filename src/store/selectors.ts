import { RootState } from '.';

export const selectScore = (state: RootState) => state?.quiz?.data?.score;

export const selectStatus = (state: RootState) => state?.quiz?.status;

export const selectActionList = (state: RootState) => state?.quiz?.action;

export const selectCurrentIndex = (state: RootState) =>
  state?.quiz?.data?.currentQuestionIndex;

export const selectCurrentQuestion = (state: RootState) =>
  state?.quiz?.data?.questionList?.[selectCurrentIndex(state)];

export const selectAllowMultipleAnswers = (state: RootState) =>
  selectCurrentQuestion(state)?.correctAnswerKeyList?.length > 1;

export const selectHasMoreQuestions = (state: RootState) =>
  state?.quiz?.data?.questionList?.length - 1 > selectCurrentIndex(state);

export const selectSelectedAnswers = (state: RootState) =>
  state?.quiz?.data?.selectedAnswers;

export const selectQuestionList = (state: RootState) =>
  state?.quiz?.data?.questionList;

export const selectAttemptCount = (state: RootState) =>
  state?.quiz?.data?.attemptCount;

export const selectTimeRemaining = (state: RootState) =>
  state?.quiz?.data?.timeLeft;
