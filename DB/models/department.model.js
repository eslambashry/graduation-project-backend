import mongoose from 'mongoose';

const departmentSchema = new mongoose.Schema({
    name: {
      type: String,
      required: [true, 'Department name is required'],
      unique: true,
      trim: true,
      minlength: [3, 'Department name must be at least 3 characters long']
    },
    description: {
      type: String,
      trim: true
    }
  }, { timestamps: true, versionKey: false });

export const departmentModel = mongoose.model('Department', departmentSchema);
