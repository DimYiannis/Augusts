import mongoose from 'mongoose'

export interface BaseDocument extends mongoose.Document {
  createdAt: Date
  updatedAt: Date
}

export const BaseSchema = new mongoose.Schema<BaseDocument>(
  {},
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
) 