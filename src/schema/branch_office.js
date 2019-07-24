import { gql } from 'apollo-server-express';

export default gql`

  extend type Query {
    branchOffices(cursor: String, limit: Int): BranchOfficeConnection!
    branchOffice(id: ID!): branchOffice!
    branchOfficesByCountry(country: ID!): [branchOfficesGroupedByStates!]
  }

  extend type Mutation {
    createBranchOffice(name: String!, country: ID!, state: String!, address: String!, office_number: Int!): branchOffice!
    deleteBranchOffice(id: ID!): Boolean!
  }

  type branchOfficesGroupedByStates {
    state: String
    branch_offices: [branchOfficeUnderScoreId]
  }

  type BranchOfficeConnection {
    edges: [branchOffice!]!
    pageInfo: PageInfo!
  }

  type branchOfficeUnderScoreId {
    _id: ID!
    name: String!
    address: String!
    office_number: Int!
  }

  type branchOffice {
    id: ID!
    name: String!
    country: Country!
    state: String!
    address: String!
    office_number: Int!
  }

`;
