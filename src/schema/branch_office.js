import { gql } from 'apollo-server-express';

export default gql`

  extend type Query {
    branchOffices(cursor: String, limit: Int): BranchOfficeConnection!
    branchOffice(id: ID!): branchOffice!
  }

  extend type Mutation {
    createBranchOffice(name: String!, country: ID!, address: String!): branchOffice!
    deleteBranchOffice(id: ID!): Boolean!
  }

  type BranchOfficeConnection {
    edges: [branchOffice!]!
    pageInfo: PageInfo!
  }

  type branchOffice {
    id: ID!
    name: String!
    country: Country!
    address: String!
  }

`;
