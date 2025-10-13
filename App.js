import { StatusBar } from 'expo-status-bar';
import { ApolloProvider } from '@apollo/client';
import { NativeRouter } from 'react-router-native';
import createApolloClient from './src/utils/apolloClient';
import Main from './src/components/Main';

const apolloClient = createApolloClient();

export default function App() {
  return (
    <NativeRouter>
      <ApolloProvider client={apolloClient}>
        <Main />
        <StatusBar style='auto' />
      </ApolloProvider>
    </NativeRouter>
  );
}
