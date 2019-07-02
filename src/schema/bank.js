import { gql } from 'apollo-server-express';

export default gql`
  extend type Query {
    banks(cursor: String, limit: Int): MessageConnection!
    bank(id: ID!): Bank!
  }

  extend type Mutation {
    createBank(name: String!, country: ID!): Bank!
    deleteBank(id: ID!): Boolean!
  }

  type BankConnection {
    edges: [Bank!]!
    pageInfo: PageInfo!
  }

  type PageInfo {
    hasNextPage: Boolean!
    endCursor: String!
  }

  type Bank {
    id: ID!
    name: String!
    country: Country!
  }

`;
