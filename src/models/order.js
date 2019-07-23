import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema(
  {
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
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
    receiver_dni: {
      type: String,
      required: true
    },
    receiver_phone: {
      type: String,
      required: true
    },
    order_number: {
      type: String,
      required: true
    },
    amount: {
      type: Number,
      required: true
    },
    destination_amount: {
      type: Number,
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
    exchange: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Exchange',
      required: true
    },
    bank_operation_number: {
      type: String,
      required: true,
      unique: true
    }
  },
  {
    timestamps: true
  },
);

const Order = mongoose.model('Order', orderSchema);

export default Order;