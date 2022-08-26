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

/**
 * Determine new state of selected answers from current state and if multiple answers are allowed.
 * @param currentState
 * @param selected
 * @param multipleAllowed
 */
export const getSelectedState = (
  currentState: string[],
  value: string,
  multipleAllowed: boolean
) => {
  let newState: string[] = [];
  if (multipleAllowed) {
    // If answer is already selected.
    if (currentState.includes(value)) {
      // Don't allow deselecting of options if there is only one selected.
      if (currentState.length === 1) {
        newState = currentState;
        // If there are multiple options chosen, remove value from currentState.
      } else {
        const index = currentState.indexOf(value);
        const currentStateClone = [...currentState];
        currentStateClone.splice(index, 1);
        newState = currentStateClone;
      }
    } else {
      newState = currentState.concat([value]);
    }
  } else {
    // Only one answer allowed.
    newState.push(value);
  }
  return newState;
};
