export const typeDefs = `
  type Query {
    members: [Member]
    member(id: ID!): Member
    roles: [Role]
  }

  type Mutation {
    addMember(name: String!, email: String!, age: Int!, role: String): String
    updateMember(id: ID!, newName: String, newAge: Int, newEmail: String, newRole: String): String
    deleteMember(id: ID!): String
  }

  
  type Member {
    id: ID!
    name: String!
    email: String!
    age: Int!
    role: Role
  }

  type Role {
    id: ID!
    as: String!
  }
`;
