import { Provider } from 'react-redux';
import { FC, ReactNode } from 'react';
import store from '../store';

const ReduxStoreProvider: FC<{
  children: ReactNode;
}> = ({ children }) => {
  return <Provider store={store}>{children}</Provider>;
};

export default ReduxStoreProvider;
