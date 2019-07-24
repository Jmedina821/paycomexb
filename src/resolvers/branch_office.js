import { combineResolvers } from 'graphql-resolvers';
import { isAuthenticated } from './authorization';
import mongoose from 'mongoose';

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
      const branchOffices = await models.branchOffice.find(
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
    branchOffice: async (parent, { id }, { models }) => {
      return await models.branchOffice.branchOffice(id);
    },
    branchOfficesByCountry: async (parent, { country }, { models }) => {
      return await models.branchOffice.aggregate([
        { $match: { country: mongoose.Types.ObjectId(country) } },
        { $group: { _id: '$state', branch_offices: { $push: "$$ROOT" } } },
        { $addFields: { state: '$_id'} },
        {
          $project: {
            _id: 0
          }
        }
      ]);
    }
  },

  Mutation: {
    createBranchOffice: combineResolvers(
      isAuthenticated,
      async (parent,
        { name,
          country,
          state,
          address,
          office_number
        },
        { models }) => {
        const branchOffice = await models.branchOffice.create({
          name,
          country,
          state,
          address,
          office_number
        });

        return branchOffice;
      },
    ),

    deleteBranchOffice: combineResolvers(
      isAuthenticated,
      async (parent, { id }, { models }) => {
        const branchOffice = await models.branchOffice.findById(id);
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
    country: async (branchOffice, args, { models }) => {
      return await models.Country.findById(branchOffice.country);
    },
  },

};
