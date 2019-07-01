import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema(
  {
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    status: {
      type: String,
      required: true,
      default: 'PENDING'
    },
    origin_bank: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Bank',
      required: true
    },
    destination_bank: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Bank',
      required: true
    },
    receiver: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    order_number: {
      type: String,
      required: true
    },
    amount: {
      type: String,
      required: true
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
    },
    branch_office: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'BranchOffice',
      required: true
    },
    address: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true,
  },
);

const Order = mongoose.model('Order', orderSchema);

export default Order;