import { ForbiddenError } from 'apollo-server';
import { combineResolvers, skip } from 'graphql-resolvers';

export const isAuthenticated = (parent, args, { me }) =>
  me ? skip : new ForbiddenError('Not authenticated as user.');

export const isAdmin = combineResolvers(
  isAuthenticated,
  (parent, args, { me: { role } }) =>
    role === 'MASTER_ADMIN'
      ? skip
      : new ForbiddenError('Not authorized as admin.'),
);

export const atLeastCountryAdmin = combineResolvers(
  isAuthenticated,
  (parent, args, { me: { role } }) =>
    AT_LEAST_COUNTRY_ADMIN.includes(role)
      ? skip
      : new ForbiddenError(`Not authorized as ${role}.`),
)

export const atLeastRegionAdmin = combineResolvers(
  isAuthenticated,
  (parent, args, { me: { role } }) =>
    AT_LEAST_REGION_ADMIN.includes(role)
      ? skip
      : new ForbiddenError(`Not authorized as ${role}.`),
)

export const atLeastBranchAdmin = combineResolvers(
  isAuthenticated,
  (parent, args, { me: { role } }) =>
    AT_LEAST_BRANCH_ADMIN.includes(role)
      ? skip
      : new ForbiddenError(`Not authorized as ${role}.`),
)

export const atLeastOperator = combineResolvers(
  isAuthenticated,
  (parent, args, { me: { role } }) =>
    AT_LEAST_OPERATOR.includes(role)
      ? skip
      : new ForbiddenError(`Not authorized as ${role}.`),
)

export const isMessageOwner = async (
  parent,
  { id },
  { models, me },
) => {
  const message = await models.Message.findById(id);

  if (message.userId != me.id) {
    throw new ForbiddenError('Not authenticated as owner.');
  }

  return skip;
};

const AT_LEAST_COUNTRY_ADMIN = [
  'MASTER_ADMIN',
  'COUNTRY_ADMIN'
];

const AT_LEAST_REGION_ADMIN = [
  'MASTER_ADMIN',
  'COUNTRY_ADMIN',
  'REGION_ADMIN'
];

const AT_LEAST_BRANCH_ADMIN = [
  'MASTER_ADMIN',
  'COUNTRY_ADMIN',
  'REGION_ADMIN',
  'BRANCH_ADMIN',
];

const AT_LEAST_OPERATOR = [
  'MASTER_ADMIN',
  'COUNTRY_ADMIN',
  'REGION_ADMIN',
  'BRANCH_ADMIN',
  'OPERATOR'
];

export const ROLES = [
  'MASTER_ADMIN',
  'COUNTRY_ADMIN',
  'REGION_ADMIN',
  'BRANCH_ADMIN',
  'OPERATOR',
  'USER'
];