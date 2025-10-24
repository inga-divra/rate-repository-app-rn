import { gql } from '@apollo/client';

export const GET_REPOSITORIES = gql`
  query GetRepositories(
    $orderDirection: OrderDirection
    $orderBy: AllRepositoriesOrderBy
  ) {
    repositories(orderDirection: $orderDirection, orderBy: $orderBy) {
      edges {
        node {
          id
          fullName
          description
          language
          forksCount
          stargazersCount
          ratingAverage
          reviewCount
          ownerAvatarUrl
        }
      }
    }
  }
`;

export const ME = gql`
  {
    me {
      id
      username
    }
  }
`;

export const GET_SINGLE_REPO = gql`
  query GetSingleRepo($id: ID!) {
    repository(id: $id) {
      id
      fullName
      description
      language
      forksCount
      stargazersCount
      ratingAverage
      reviewCount
      ownerAvatarUrl
      url
      reviews {
        edges {
          node {
            id
            text
            rating
            createdAt
            user {
              id
              username
            }
          }
        }
      }
    }
  }
`;
