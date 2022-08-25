import React, { createContext, useReducer, FC, ReactNode } from 'react';

const QuizContext = createContext({});

const QuizContextProvider: FC<{
  children: ReactNode;
}> = ({ children }) => {
  const [state, dispatch] = useReducer(quizReducer, initialQuizState);

  return (
    <QuizContext.Provider value={[state, dispatch]}>
      {children}
    </QuizContext.Provider>
  );
};
