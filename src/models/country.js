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
        states: {
            type: Array,
            required: true
        }
    },
    {
        timestamps: true,
    },
);

const Country = mongoose.model('Country', countrySchema);

export default Country;