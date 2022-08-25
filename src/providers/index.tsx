import { FC } from 'react';
import QuizContextProvider from './QuizContextProvider';

const Providers: FC<{}> = ({ children }) => (
  <QuizContextProvider>{children}</QuizContextProvider>
);

export default Providers;
