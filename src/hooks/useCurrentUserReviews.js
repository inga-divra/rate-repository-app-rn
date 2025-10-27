import { useQuery } from '@apollo/client';
import { GET_CURRENT_USER } from '../graphql/queries';

const useCurrentUserReviews = () => {
  const { data, loading, error } = useQuery(GET_CURRENT_USER, {
    variables: { includeReviews: true },
    fetchPolicy: 'cache-and-network',
  });
  const reviews = data?.me?.reviews;
  return { reviews, loading, error };
};
export default useCurrentUserReviews;
