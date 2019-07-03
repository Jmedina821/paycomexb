import { gql } from 'apollo-server-express';

export default gql`

  extend type Query {
    orders(cursor: String, limit: Int): OrderConnection!
    order(id: ID!): Order!
  }

  extend type Mutation {
    createOrder(
     sender: ID!,
     status: String!,
     origin_country: ID!,
     destination_country: ID!,
     origin_bank: ID!,
     destination_bank: ID!,
     branch_office: ID!,
     receiver: ID!,
     order_number: String!,
     amount: Float!
     ): Order!
    deleteOrder(id: ID!): Boolean!
  }

  type OrderConnection {
    edges: [Order!]!
    pageInfo: PageInfo!
  }

  type Order {
    id: ID!
    sender: User!
    status: String!
    origin_country: Country!
    destination_country: Country!
    origin_bank: Bank!
    destination_bank: Bank!
    branch_office: branchOffice!
    receiver: User!
    order_number: String!
    amount: Float!
  }

`;
