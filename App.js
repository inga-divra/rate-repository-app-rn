import { StatusBar } from 'expo-status-bar';
import { ApolloProvider } from '@apollo/client';
import { NativeRouter } from 'react-router-native';
import createApolloClient from './src/utils/apolloClient';
import Main from './src/components/Main';
import Constants from 'expo-constants';

const apolloClient = createApolloClient();

export default function App() {
  console.log(Constants.expoConfig);
  return (
    <NativeRouter>
      <ApolloProvider client={apolloClient}>
        <Main />
        <StatusBar style='auto' />
      </ApolloProvider>
    </NativeRouter>
  );
}
