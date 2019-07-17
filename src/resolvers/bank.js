import { combineResolvers } from 'graphql-resolvers';
import { isAuthenticated } from './authorization';

const toCursorHash = string => Buffer.from(string).toString('base64');

const fromCursorHash = string =>
  Buffer.from(string, 'base64').toString('ascii');

export default {
  Query: {
    banks: async (parent, { cursor, limit = 100 }, { models }) => {
      const cursorOptions = cursor
        ? {
          createdAt: {
            $lt: fromCursorHash(cursor),
          },
        }
        : {};
      const banks = await models.Bank.find(
        cursorOptions,
        null,
        {
          sort: { createdAt: -1 },
          limit: limit + 1,
        },
      );

      const hasNextPage = banks.length > limit;
      const edges = hasNextPage ? banks.slice(0, -1) : banks;

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
    bank: async (parent, { id }, { models }) => {
      return await models.Bank.findById(id);
    },
  },

  Mutation: {
    createBank: combineResolvers(
      isAuthenticated,
      async (parent,
        { name,
          country
        },
        { models }) => {
        const bank = await models.Bank.create({
          name,
          country
        });

        return bank;
      },
    ),

    deleteBank: combineResolvers(
      isAuthenticated,
      async (parent, { id }, { models }) => {
        const bank = await models.Bank.findById(id);

        if (bank) {
          await bank.remove();
          return true;
        } else {
          return false;
        }
      },
    ),
  },

  Bank: {
    country: async (bank, args, { models }) => {
      return await models.Country.findById(bank.country);
    },
  },

};
