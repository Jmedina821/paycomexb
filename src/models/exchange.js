import mongoose from 'mongoose';

const exchangeSchema = new mongoose.Schema(
	{
		value: {
			type: Number,
			required: true,
		},
		origin_country: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Country',
			required: true
		},
		destination_country: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Country',
			required: true
		}
	},
	{
		timestamps: true,
	},
);

const Exchange = mongoose.model('Exchange', exchangeSchema);

export default Exchange;