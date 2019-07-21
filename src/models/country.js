import mongoose from 'mongoose';

const countrySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      unique: true,
      required: true,
    },
    currency: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Currency',
      required: true
    },
    alpha2code: {
      type: String,
      unique: true,
      required: true,
      minlength: 2
    },
    country_code: {
      type: Number,
      unique: true,
      required: true
    },
    states: {
      type: Array
    }
  },
  {
    timestamps: true,
  },
);

const Country = mongoose.model('Country', countrySchema);

export default Country;