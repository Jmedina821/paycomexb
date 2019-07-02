const toCursorHash = string => Buffer.from(string).toString('base64');

const fromCursorHash = string =>
  Buffer.from(string, 'base64').toString('ascii');

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
    },
  },

  Mutation: {

    createOrder: combineResolvers(
      isAuthenticated,
      async (parent,
        { sender,
          status,
          origin_bank,
          destination_bank,
          receiver,
          order_number,
          amount,
          origin_country,
          destination_country,
          branch_office,
          address
        },
        { models }) => {
        const exchange = await models.Order.create({
          sender,
          status,
          origin_bank,
          destination_bank,
          receiver,
          order_number,
          amount,
          origin_country,
          destination_country,
          branch_office,
          address
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

  Exchange: {
    sender: async (sender, args, { models }) => {
      return await models.User.findById(sender);
    },
    receiver: async (receiver, args, { models }) => {
      return await models.User.findById(receiver);
    },
    origin_bank: async (origin_bank, args, { models }) => {
      return await models.Bank.findById(origin_bank);
    },
    destination_bank: async (destination_bank, args, { models }) => {
      return await models.Bank.findById(destination_bank);
    },
    origin_country: async (origin_country, args, { models }) => {
      return await models.Country.findById(origin_country);
    },
    destination_country: async (destination_country, args, { models }) => {
      return await models.Country.findById(destination_country);
    },
    branch_office: async (branch_office, args, { models }) => {
      return await models.BranchOffice.findById(branch_office);
    }
  },

};
