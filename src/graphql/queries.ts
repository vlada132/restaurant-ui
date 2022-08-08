import { gql } from '@apollo/client';

export const getListRestaurantQuery = gql`
  query ListRestaurant($page: Int!, $limit: Int!, $search: String!) {
    getListRestaurant(page: $page, limit: $limit, search: $search) {
      data {
        id
        name
        email
        phone
        address
      }
      total
      itemPerPage
      totalPage
      currentPage
    }
  }
`;
