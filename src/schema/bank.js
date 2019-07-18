import { gql } from 'apollo-server-express';

export default gql`

  extend type Query {
    banks(cursor: String, limit: Int): BankConnection!
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

  type Bank {
    id: ID!
    name: String!
    country: Country!
  }

`;
