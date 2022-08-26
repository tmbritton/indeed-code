import {
  createContext,
  useReducer,
  FC,
  ReactNode,
  useContext,
  Context,
  Dispatch,
} from 'react';
import quizReducer, { initalQuizState } from '../state/reducers';
import { IQuizState, Action } from '../../types';

let QuizContext: Context<[IQuizState, Dispatch<Action>]>;

const QuizContextProvider: FC<{
  children: ReactNode;
}> = ({ children }) => {
  const [state, dispatch] = useReducer(quizReducer, initalQuizState);
  QuizContext = createContext([state, dispatch]);
  return (
    <QuizContext.Provider value={[state, dispatch]}>
      {children}
    </QuizContext.Provider>
  );
};

export const useQuizContext = () => {
  return useContext(QuizContext);
};

export default QuizContextProvider;
