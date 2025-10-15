import { StatusBar } from 'expo-status-bar';
import { ApolloProvider } from '@apollo/client';
import { NativeRouter } from 'react-router-native';
import createApolloClient from './src/utils/apolloClient';
import Main from './src/components/Main';
import AuthStorage from './src/utils/authStorage';

const authStorage = new AuthStorage();
const apolloClient = createApolloClient(authStorage);
const App = () => {
  return (
    <NativeRouter>
      <ApolloProvider client={apolloClient}>
        <Main />
        <StatusBar style='auto' />
      </ApolloProvider>
    </NativeRouter>
  );
};

export default App;
