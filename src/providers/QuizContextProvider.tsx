import { createContext, useReducer, FC, ReactNode, useContext } from 'react';
import quizReducer, { initalQuizState } from '../state/reducers';

const QuizContext = createContext({});

const QuizContextProvider: FC<{
  children: ReactNode;
}> = ({ children }) => {
  const [state, dispatch] = useReducer(quizReducer, initalQuizState);

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
