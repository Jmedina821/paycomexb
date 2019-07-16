import { gql } from 'apollo-server-express';

export default gql`

  extend type Query {
    exchanges(cursor: String, limit: Int): ExchangeConnection!
    exchange(id: ID!): Exchange!
    lastExchangeByCountry(origin_country: ID!, destination_country: ID!): [Exchange]!
  }

  extend type Mutation {
    createExchange(value: Float!, origin_country: ID!, destination_country: ID!): Exchange!
    deleteExchange(id: ID!): Boolean!
  }

  type ExchangeConnection {
    edges: [Exchange!]!
    pageInfo: PageInfo!
  }

  extend type Subscription {
    exchangeUpdated: ExchangeUpdated!
  }

  type Exchange {
    id: ID!
    value: Float!
    origin_country: Country!
    destination_country: Country!
    createdAt: Date!
  }

  type ExchangeUpdated {
    exchange: Exchange!
  }

`;
