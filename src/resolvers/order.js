import { combineResolvers } from 'graphql-resolvers';
import { isAuthenticated } from './authorization';
import moongose from 'mongoose';

const toCursorHash = string => Buffer.from(string).toString('base64');

const fromCursorHash = string =>
  Buffer.from(string, 'base64').toString('ascii');

const newOrderId = async (branchOfficeId, originCountryId, models) => {

  const country = await models.Country.findById(originCountryId);
  const branch_office = await models.branchOffice.findById(branchOfficeId);
  const lastOrder = await models.Order.countDocuments();

  return `${branch_office.office_number}${country.country_code}${lastOrder + 1}`;

}

const calculateAmount = async (originCountryId, destinationCountryId, amount, models) => {

  const exchange = await models.Exchange.find({
    origin_country: moongose.Types.ObjectId(originCountryId),
    destination_country: moongose.Types.ObjectId(destinationCountryId)
  })
    .sort({ createdAt: -1 })
    .limit(1);
    console.log(exchange);
  const destination_amount = exchange.length > 0 ? (exchange[0].value * amount) : 0;
  return {destination_amount, exchange: exchange[0].id};

}

export default {
  Query: {
    orders: async (parent, { cursor, limit = 100 }, { models }) => {
      const cursorOptions = cursor
        ? {
          createdAt: {
            $lt: fromCursorHash(cursor),
          },
        }
        : {};
      const orders = await models.Order.find(
        cursorOptions,
        null,
        {
          sort: { createdAt: -1 },
          limit: limit + 1,
        },
      );

      const hasNextPage = orders.length > limit;
      const edges = hasNextPage ? orders.slice(0, -1) : orders;

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
    order: async (parent, { id }, { models }) => {
      return await models.Order.findById(id);
    }
  },

  Mutation: {

    createOrder: combineResolvers(
      isAuthenticated,
      async (parent,
        { sender,
          status,
          origin_bank,
          destination_bank,
          receiver_dni,
          receiver_phone,
          amount,
          origin_country,
          destination_country,
          branch_office,
          bank_operation_number
        },
        { models }) => {

        const order_number = await newOrderId(branch_office, origin_country, models);
        const {destination_amount, exchange} = await calculateAmount(origin_country, destination_country, amount, models);

        const order = await models.Order.create({
          sender,
          status,
          origin_bank,
          destination_bank,
          receiver_dni,
          receiver_phone,
          order_number,
          amount,
          destination_amount,
          origin_country,
          destination_country,
          branch_office,
          destination_amount,
          bank_operation_number,
          exchange
        });

        return order;
      },
    ),

    deleteOrder: combineResolvers(
      isAuthenticated,
      async (parent, { id }, { models }) => {
        const order = await models.Order.findById(id);

        if (order) {
          await order.remove();
          return true;
        } else {
          return false;
        }
      },
    ),
  },

  Order: {
    sender: async (order, args, { models }) => {
      return await models.User.findById(order.sender);
    },
    exchange: async (order, args, { models }) => {
      return await models.Exchange.findById(order.exchange);
    },
    origin_bank: async (order, args, { models }) => {
      return await models.Bank.findById(order.origin_bank);
    },
    destination_bank: async (order, args, { models }) => {
      return await models.Bank.findById(order.destination_bank);
    },
    origin_country: async (order, args, { models }) => {
      return await models.Country.findById(order.origin_country);
    },
    destination_country: async (order, args, { models }) => {
      return await models.Country.findById(order.destination_country);
    },
    branch_office: async (order, args, { models }) => {
      return await models.BranchOffice.findById(order.branch_office);
    }
  },

};
