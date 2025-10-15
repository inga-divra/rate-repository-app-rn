import { AUTHENTICATE } from '../graphql/mutations';
import { useMutation } from '@apollo/client';
import useAuthStorage from '../hooks/useAuthStorage';
const useSignIn = () => {
  const authStorage = useAuthStorage();
  const [mutate, result] = useMutation(AUTHENTICATE);
  /* mutate({
  variables: {},
  context: {},
  refetchQueries: [],
}) */
  const signIn = async ({ username, password }) => {
    // call the mutate function here with the right arguments
    return mutate({
      variables: {
        credentials: { username, password },
      },
    });
  };

  return [signIn, result];
};

export default useSignIn;
