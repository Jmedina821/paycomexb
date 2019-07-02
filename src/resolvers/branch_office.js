const toCursorHash = string => Buffer.from(string).toString('base64');

const fromCursorHash = string =>
  Buffer.from(string, 'base64').toString('ascii');

export default {
  Query: {
    branchOffices: async (parent, { cursor, limit = 100 }, { models }) => {
      const cursorOptions = cursor
        ? {
          createdAt: {
            $lt: fromCursorHash(cursor),
          },
        }
        : {};
      const branchOffices = await models.BranchOffice.find(
        cursorOptions,
        null,
        {
          sort: { createdAt: -1 },
          limit: limit + 1,
        },
      );

      const hasNextPage = branchOffices.length > limit;
      const edges = hasNextPage ? branchOffices.slice(0, -1) : branchOffices;

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
    branch_office: async (parent, { id }, { models }) => {
      return await models.BranchOffice.findById(id);
    },
  },

  Mutation: {
    createBranchOffice: combineResolvers(
      isAuthenticated,
      async (parent,
        { name,
          country,
          address
        },
        { models }) => {
        const branchOffice = await models.BranchOffice.create({
          name,
          country,
          address
        });

        return branchOffice;
      },
    ),

    deleteBranchOffice: combineResolvers(
      isAuthenticated,
      async (parent, { id }, { models }) => {
        const branchOffice = await models.BranchOffice.findById(id);

        if (branchOffice) {
          await branchOffice.remove();
          return true;
        } else {
          return false;
        }
      },
    ),
  },

  branchOffice: {
    country: async (country, args, { models }) => {
      return await models.Country.findById(country);
    },
  },

};
