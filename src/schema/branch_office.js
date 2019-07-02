import { gql } from 'apollo-server-express';

export default gql`

  extend type Query {
    branchOffices(cursor: String, limit: Int): BranchOfficeConnection!
    branchOffice(id: ID!): branchOffice!
  }

  extend type Mutation {
    createBranchOffice(value: Number!, origin_country: ID!, destination_country: ID!): BranchOffice!
    deleteBranchOffice(id: ID!): Boolean!
  }

  type BranchOfficeConnection {
    edges: [branchOffice!]!
    pageInfo: PageInfo!
  }

  type PageInfo {
    hasNextPage: Boolean!
    endCursor: String!
  }

  type branchOffice {
    id: ID!
    value: Number!
    origin_country: Country!
    destination_country: Country!
  }

`;
