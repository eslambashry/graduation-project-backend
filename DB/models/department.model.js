import mongoose from 'mongoose';

const departmentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    trim: true,
  }
}, { timestamps: true });

export const departmentModel = mongoose.model('Department', departmentSchema);
