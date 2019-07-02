import mongoose from 'mongoose';

const countrySchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        currency: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Currency',
            required: true
        },
        states: {
            type: Array,
            required: true
        }
    },
    {
        timestamps: true,
    },
);

const Country = mongoose.model('country', countrySchema);

export default Country;