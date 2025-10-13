import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { Platform } from 'react-native';
const uri =
  Platform.OS === 'web'
    ? 'http://localhost:4000/graphql'
    : 'http://192.168.1.100:4000/graphql';

const httpLink = createHttpLink({ uri });

const createApolloClient = () =>
  new ApolloClient({
    link: httpLink,
    cache: new InMemoryCache(),
  });

export default createApolloClient;
