import {
  isAnswerCorrect,
  getStateAfterSubmittingAnswer,
  getSelectedState,
} from './utils';

const oneCorrectAnswer = ['123'];

const twoCorrectAnswers = ['123', 'abc'];

test('isAnswerCorrect returns false if correctAnswers is not an array.', () => {
  expect(isAnswerCorrect(null, ['123'])).toEqual(false);
});

test('isAnswerCorrect returns false if chosenAnswers is not an array.', () => {
  expect(isAnswerCorrect(twoCorrectAnswers, undefined)).toEqual(false);
});

test('isAnswerCorrect returns false when chosenAnswers is an empty array.', () => {
  expect(isAnswerCorrect(twoCorrectAnswers, [])).toEqual(false);
});

test('isAnswerCorrect returns false when the number of choices does not match the correct answer.', () => {
  expect(isAnswerCorrect(twoCorrectAnswers, ['123'])).toEqual(false);
});

test('isCorrectAnswer returns false when there is one correct option and the chosen answer is incorrect', () => {
  expect(isAnswerCorrect(oneCorrectAnswer, ['foo'])).toEqual(false);
});

test('isCorrectAnswer returns false when one chosen answer is incorrect', () => {
  expect(isAnswerCorrect(twoCorrectAnswers, ['123', 'def'])).toEqual(false);
});

test('isCorrectAnswer return true when there is one correct choice', () => {
  expect(isAnswerCorrect(oneCorrectAnswer, ['123'])).toEqual(true);
});

test('isCorrectAnswer returns true when there are multiple correct answers', () => {
  expect(isAnswerCorrect(twoCorrectAnswers, ['123', 'abc'])).toEqual(true);
});

test('getStateAfterSubmittingAnswer should return correct if answer is correct', () => {
  expect(getStateAfterSubmittingAnswer(true, true)).toEqual('correct');
  expect(getStateAfterSubmittingAnswer(true, false)).toEqual('correct');
});

test('getStateAfterSubmittingAnswer should return tryagain if answer is incorrect and there are attempts left', () => {
  expect(getStateAfterSubmittingAnswer(false, true)).toEqual('tryagain');
});

test('getStateAfterSubmittingAnswer should return incorrect if answer is incorrect and there are no attempts left', () => {
  expect(getStateAfterSubmittingAnswer(false, false)).toEqual('incorrect');
});

test('getSelectedState: If multiple are not allowed, replace currentState with selected value.', () => {
  const current = ['foo'];
  expect(getSelectedState(current, 'bar', false)).toEqual(['bar']);
});

test('getSelectedState: If multiple are allowed, selected should be added to the array.', () => {
  const current = ['foo'];
  expect(getSelectedState(current, 'bar', true)).toEqual(['foo', 'bar']);
});

test('getSelectedState: If multiple are allowed, and the value is already selected, It should be removed.', () => {
  const current = ['foo', 'bar'];
  expect(getSelectedState(current, 'foo', true)).toEqual(['bar']);
});

test('getSelectedState: If multiple are allowed, and there is only one current selection, and the same selection is chosen again, it should not be removed.', () => {
  const current = ['foo'];
  expect(getSelectedState(current, 'foo', true)).toEqual(['foo']);
});
