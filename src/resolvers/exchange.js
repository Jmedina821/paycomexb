import { combineResolvers } from 'graphql-resolvers';
import { isAuthenticated } from './authorization';
import pubsub, { EVENTS } from '../subscription';
import moongose from 'mongoose';

const toCursorHash = string =>
  Buffer.from(string).toString('base64');

const fromCursorHash = string =>
  Buffer.from(string, 'base64').toString('ascii');

export default {
  Query: {
    exchanges: async (parent, { cursor, limit = 100 }, { models }) => {
      const cursorOptions = cursor
        ? {
          createdAt: {
            $lt: fromCursorHash(cursor),
          },
        }
        : {};
      const exchanges = await models.Exchange.find(
        cursorOptions,
        null,
        {
          sort: { createdAt: -1 },
          limit: limit + 1,
        },
      );

      const hasNextPage = exchanges.length > limit;
      const edges = hasNextPage ? exchanges.slice(0, -1) : exchanges;

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
    exchange: async (parent, { id }, { models }) => {
      return await models.Exchange.findById(id);
    },
    lastExchangeByCountry: async (parent, { origin_country, destination_country }, { models }) => {
      const response = await models.Exchange.find({
        origin_country: moongose.Types.ObjectId(origin_country),
        destination_country: moongose.Types.ObjectId(destination_country)
      })
        .sort({ createdAt: -1 })
        .limit(1);
      return response;
    }
  },

  Mutation: {
    createExchange: combineResolvers(
      isAuthenticated,
      async (parent,
        { value,
          origin_country,
          destination_country
        },
        { models }) => {

        const exchange = await models.Exchange.create({
          value,
          origin_country,
          destination_country
        });

        pubsub.publish(EVENTS.MESSAGE.UPDATED, {
          exchangeUpdated: { exchange }
        });

        return exchange;
      },
    ),

    deleteExchange: combineResolvers(
      isAuthenticated,
      async (parent, { id }, { models }) => {
        const exchange = await models.Exchange.findById(id);

        if (exchange) {
          await exchange.remove();
          return true;
        } else {
          return false;
        }
      },
    ),
  },

  Subscription: {
    exchangeUpdated: {
      subscribe: () => pubsub.asyncIterator(EVENTS.MESSAGE.UPDATED)
    }
  },

  Exchange: {
    origin_country: async (exchange, args, { models }) => {
      return await models.Country.findById(exchange.origin_country);
    },
    destination_country: async (exchange, args, { models }) => {
      return await models.Country.findById(exchange.destination_country);
    },
  },

};
