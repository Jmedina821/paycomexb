import { gql } from 'apollo-server-express';

export default gql`
  extend type Query {
    users: [User!]
    user(id: ID!): User
    me: User
    myOrders: [Order]!
  }

  extend type Mutation {
    signUp(
      username: String!
      email: String!
      password: String!
      branch_office: ID
      phone: String
      dni: String!
    ): Token!

    signIn(login: String!, password: String!): Token!
    updateUser(username: String!): User!
    deleteUser(id: ID!): Boolean!
  }

  type Token {
    token: String!
  }

  type User {
    id: ID!
    username: String!
    email: String!
    role: String
    branch_office: branchOffice
    phone: String
    dni: String!
    messages: [Message!]
  }
`;
