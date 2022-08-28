import { FC } from 'react';
import ReduxStoreProvider from './ReduxStoreProvider';

const Providers: FC<{}> = ({ children }) => (
  <ReduxStoreProvider>{children}</ReduxStoreProvider>
);

export default Providers;
