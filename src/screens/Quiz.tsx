import { FC, Dispatch } from 'react';
import { useQuizContext } from '../providers/QuizContextProvider';
import { Action } from '../../types';
import { useNavigate, NavigateFunction } from 'react-router';

const Quiz: FC<{}> = () => {
  const [state, dispatch] = useQuizContext();
  const navigate = useNavigate();
  return <h1>Quiz</h1>;
};

export default Quiz;
