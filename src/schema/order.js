import { gql } from 'apollo-server-express';

export default gql`

  extend type Query {
    orders(cursor: String, limit: Int): BranchOfficeConnection!
    order(id: ID!): branchOffice!
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

  type Order {
    id: ID!
    sender: User!
    status: String!
    origin_country: Country!
    destination_country: Country!
    receiver: User!
    order_number: String!
    amount: Number!
  }

`;
