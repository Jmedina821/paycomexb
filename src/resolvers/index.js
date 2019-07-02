import { GraphQLDateTime } from 'graphql-iso-date';

import userResolvers from './user';
import messageResolvers from './message';
import branchOfficeResolvers from './branch_office';
import currencyResolvers from './currency';
import exchangeResolvers from './exchange';
import orderResolvers from './order';
import bankResolvers from './bank';
import countryResolvers from './country';

const customScalarResolver = {
  Date: GraphQLDateTime,
};

export default [
  customScalarResolver,
  userResolvers,
  messageResolvers,
  branchOfficeResolvers,
  currencyResolvers,
  exchangeResolvers,
  orderResolvers,
  bankResolvers,
  countryResolvers
];
