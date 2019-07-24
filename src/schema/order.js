import { gql } from 'apollo-server-express';

export default gql`

  extend type Query {
    orders(cursor: String, limit: Int, country: ID, branchOffice: ID): OrderConnection!
    order(id: ID!): Order!
  }

  extend type Mutation {
    createOrder(
     sender: ID!,
     origin_country: ID!,
     destination_country: ID!,
     origin_bank: ID!,
     destination_bank: ID!,
     branch_office: ID!,
     receiver_dni: String!,
     receiver_phone: String!,
     amount: Float!,
     bank_operation_number: String!
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
    receiver_dni: String!
    receiver_phone: String!
    order_number: String!
    amount: Float!
    destination_amount: Float!
    bank_operation_number: String!
    exchange: Exchange
    createdAt: Date!
  }

`;
