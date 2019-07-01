import mongoose from 'mongoose';

import User from './user';
import Message from './message';
import Bank from './bank';
import branchOffice from './branch-office';
import Country from './country';
import Order from './order';

const connectDb = () => {
  if (process.env.TEST_DATABASE_URL) {
    return mongoose.connect(
      process.env.TEST_DATABASE_URL,
      { useNewUrlParser: true, useCreateIndex: true },
    );
  }

  if (process.env.DATABASE_URL) {
    return mongoose.connect(
      process.env.DATABASE_URL,
      { useNewUrlParser: true, useCreateIndex: true },
    );
  }
};

const models = { User, Message, Bank, branchOffice, Country, Order };

export { connectDb };

export default models;
