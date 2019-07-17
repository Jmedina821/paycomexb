import mongoose from 'mongoose';

const branchOfficeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    country: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'countries',
      required: true
    },
    state: {
      type: String,
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

const branchOffice = mongoose.model('BranchOffice', branchOfficeSchema);

export default branchOffice;