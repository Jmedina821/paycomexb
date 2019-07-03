import { gql } from 'apollo-server-express';

import userSchema from './user';
import messageSchema from './message';
import branchOfficeSchema from './branch_office';
import bankSchema from './bank';
import countrySchema from './country';
import exchangeSchema from './exchange';
import orderSchema from './order';
import currencySchema from './currency';

const linkSchema = gql`
  scalar Date

  type Query {
    _: Boolean
  }

  type Mutation {
    _: Boolean
  }

  type Subscription {
    _: Boolean
  }
`;

export default [
  linkSchema,
  userSchema,
  messageSchema,
  bankSchema,
  branchOfficeSchema,
  orderSchema,
  countrySchema,
  exchangeSchema,
  currencySchema
];
