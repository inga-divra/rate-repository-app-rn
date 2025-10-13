import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { Platform } from 'react-native';
import Constants from 'expo-constants';

const { apolloUriWeb, apolloUriMob } = Constants.expoConfig.extra;

const uri = Platform.OS === 'web' ? apolloUriWeb : apolloUriMob;

const httpLink = createHttpLink({ uri });

const createApolloClient = () =>
  new ApolloClient({
    link: httpLink,
    cache: new InMemoryCache(),
  });

export default createApolloClient;
