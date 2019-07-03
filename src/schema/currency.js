import { gql } from 'apollo-server-express';

export default gql`

  extend type Query {
    currencies(cursor: String, limit: Int): CurrencyConnection!
    currency(id: ID!): Currency!
  }

  extend type Mutation {
    createCurrency(name: String!, short: String!): Currency!
    deleteCurrency(id: ID!): Boolean!
  }

  type CurrencyConnection {
    edges: [Currency!]!
    pageInfo: PageInfo!
  }

  type Currency {
    id: ID!
    name: String!
    short: String!
  }

`;
