import { gql } from 'apollo-server-express';

export default gql`

  extend type Query {
    countries(cursor: String, limit: Int): CountryConnection!
    country(id: ID!): Country!
  }

  extend type Mutation {
    createCountry(name: String!, currency: ID!): Country!
    deleteCountry(id: ID!): Boolean!
  }

  type CountryConnection {
    edges: [Country!]!
    pageInfo: PageInfo!
  }

  type Country {
    id: ID!
    name: String!
    currency: Currency!
  }

`;
