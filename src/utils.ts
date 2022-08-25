import { QuizStatus } from '../types';

/**
 * Check if answer is correct.
 * @param correctAnswers String array from Question object.
 * @param chosenAnswers String array of chosen answers.
 * @returns boolean
 */
export const isAnswerCorrect = (
  correctAnswers: string[],
  chosenAnswers: string[]
) => {
  // Exit early if either params are not an array.
  if (!Array.isArray(correctAnswers) || !Array.isArray(chosenAnswers)) {
    return false;
  }
  // This will handle incorrect number of answers as well as an empty array.
  if (correctAnswers.length !== chosenAnswers.length) {
    return false;
  }
  // Create new arrays, sort, convert to strings, compare equality.
  const correct = [...correctAnswers].sort();
  const chosen = [...chosenAnswers].sort();
  return correct.join('') === chosen.join('');
};

/**
 * Get the next state after submitting an answer.
 * @param isCorrect
 * @param hasAttemptsLeft
 * @returns
 */
export const getStateAfterSubmittingAnswer = (
  isCorrect: boolean,
  hasAttemptsLeft: boolean
): QuizStatus => {
  if (isCorrect) {
    return 'correct';
  }
  if (hasAttemptsLeft) {
    return 'tryagain';
  }
  return 'incorrect';
};
