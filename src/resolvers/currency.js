import { combineResolvers } from 'graphql-resolvers';
import { isAuthenticated } from './authorization';

const toCursorHash = string => Buffer.from(string).toString('base64');

const fromCursorHash = string =>
  Buffer.from(string, 'base64').toString('ascii');

export default {
  Query: {
    currencies: async (parent, { cursor, limit = 100 }, { models }) => {
      const cursorOptions = cursor
        ? {
          createdAt: {
            $lt: fromCursorHash(cursor),
          },
        }
        : {};
      const currencies = await models.Currency.find(
        cursorOptions,
        null,
        {
          sort: { createdAt: -1 },
          limit: limit + 1,
        },
      );

      const hasNextPage = currencies.length > limit;
      const edges = hasNextPage ? currencies.slice(0, -1) : currencies;

      return {
        edges,
        pageInfo: {
          hasNextPage,
          endCursor: toCursorHash(
            edges[edges.length - 1].createdAt.toString(),
          ),
        },
      };
    },
    currency: async (parent, { id }, { models }) => {
      return await models.Currency.findById(id);
    },
  },

  Mutation: {
    createCurrency: combineResolvers(
      isAuthenticated,
      async (parent,
        { 
          name,
          short
        },
        { models }) => {
        const currency = await models.Currency.create({
          name,
          short
        });

        return currency;
      },
    ),

    deleteCurrency: combineResolvers(
      isAuthenticated,
      async (parent, { id }, { models }) => {
        const currency = await models.Currency.findById(id);

        if (currency) {
          await currency.remove();
          return true;
        } else {
          return false;
        }
      },
    ),
  },
};
