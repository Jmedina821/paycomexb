import mongoose from 'mongoose';

const bankSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        country: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Country',
            required: true
        }
    },
    {
        timestamps: true,
    },
);

const Bank = mongoose.model('Bank', bankSchema);

export default Bank;
