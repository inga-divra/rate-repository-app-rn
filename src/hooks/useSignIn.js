import { AUTHENTICATE } from '../graphql/mutations';
import { useMutation } from '@apollo/client';

const useSignIn = () => {
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
