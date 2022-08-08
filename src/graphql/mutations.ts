import { gql } from '@apollo/client';

export const createRestaurantMutation = gql`
  mutation CreateRestaurant($payload: CreateRestaurantInput!) {
    createRestaurant(payload: $payload) {
      name
      email
      phone
      address
    }
  }
`;

export const updateRestaurantMutation = gql`
  mutation UpdateRestaurant($id: UUID!, $payload: UpdateRestaurantInput!) {
    updateRestaurant(id: $id, payload: $payload) {
      name
      email
      phone
      address
    }
  }
`;

export const deleteRestaurantMutation = gql`
  mutation DeleteRestaurant($id: UUID!) {
    deleteRestaurant(id: $id)
  }
`;
