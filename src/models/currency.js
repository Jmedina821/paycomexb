import mongoose from 'mongoose';

const currencySchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        }
    },
    {
        timestamps: true,
    },
);

const Currency = mongoose.model('currency', currencySchema);

export default Currency;