import { combineResolvers } from 'graphql-resolvers';
import { isAuthenticated } from './authorization';

const toCursorHash = string => Buffer.from(string).toString('base64');

const fromCursorHash = string =>
    Buffer.from(string, 'base64').toString('ascii');

export default {
    Query: {
        countries: async (parent, { cursor, limit = 100 }, { models }) => {
            const cursorOptions = cursor
                ? {
                    createdAt: {
                        $lt: fromCursorHash(cursor),
                    },
                }
                : {};
            const countries = await models.Country.find(
                cursorOptions,
                null,
                {
                    sort: { createdAt: -1 },
                    limit: limit + 1,
                },
            );

            const hasNextPage = countries.length > limit;
            const edges = hasNextPage ? countries.slice(0, -1) : countries;

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
        country: async (parent, { id }, { models }) => {
            return await models.Country.findById(id);
        },
    },

    Mutation: {
        createCountry: combineResolvers(
            isAuthenticated,
            async (parent,
                {
                    name,
                    currency,
                    status
                },
                { models }) => {
                const country = await models.Country.create({
                    name,
                    currency,
                    status
                });

                return country;
            },
        ),

        deleteCountry: combineResolvers(
            isAuthenticated,
            async (parent, { id }, { models }) => {
                const country = await models.Country.findById(id);

                if (country) {
                    await country.remove();
                    return true;
                } else {
                    return false;
                }
            },
        ),
    },

    Country: {
        currency: async (country, args, { models }) => {
            return await models.Currency.findById(country.currency);
        },
    },

};
