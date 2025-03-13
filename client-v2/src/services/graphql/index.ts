import { gql } from "@apollo/client";

// Queries
/**
 * * GET
 * ? This query fetches all the members.
 * ? It will return an array of members
 */
export const GET_MEMBERS = gql`
  query GetMembersList {
    members {
      id
      name
      age
      email
    }
  }
`;

/**
 * * GET
 * ? This query retrieves the member details by its provided id
 * @param $memberId: id - Unique identifier of member
 */
export const GET_MEMBER = gql`
  query GetMemberById($memberId: ID!) {
    member(id: $memberId) {
      id
      name
      age
      email
      role {
        as
      }
    }
  }
`;

// Mutations
/**
 * * POST
 * ? This mutation creates a new member
 * @param $name: string - Required name for new user/also used as unique identifier with id and email.
 * @param $email: string - Required email for new user
 * @param $age: number - Required age for new user
 * @param $role: string - Required role of new user
 */ 
export const ADD_MEMBER = gql`
  mutation AddMember(
    $name: String!
    $email: String!
    $age: Int!
    $role: String!
  ) {
    addMember(name: $name, email: $email, age: $age, role: $role)
  }
`;

/**
 * * PUT/PATCH
 * ? This mutation updates the member by its id
 * @param $memberId: id - Unique identifier for member
 * @param $newName: string - (Optional) New name for member
 * @param $newEmail: string - (Optional) New email for member
 * @param $newAge: number - (Optional) New age for member
 * @param $newRole: string - (Optional) New role for member
 */
export const UPDATE_MEMBER = gql`
  mutation UpdateMember(
    $memberId: ID!
    $newName: String
    $newAge: Int
    $newEmail: String
    $newRole: String
  ) {
    updateMember(
      id: $memberId
      newName: $newName
      newAge: $newAge
      newEmail: $newEmail
      newRole: $newRole
    )
  }
`;

/**
 * * DELETE
 * ? This mutation deletes the member from the members array by its provided id
 * @param $id: id - Unique identifier for member
 */
export const DELETE_MEMBER = gql`
  mutation DeleteMember($memberId: ID!) {
    deleteMember(id: $memberId)
  }
`
