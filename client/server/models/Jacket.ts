import mongoose from 'mongoose'
import { BaseDocument, BaseSchema } from './BaseModel'

export interface IJacket extends BaseDocument {
  name: string
  price: number
  image: string
  size?: 'S' | 'M' | 'L' | 'XL' | 'XXL' | null
}

const JacketSchema = new mongoose.Schema<IJacket>({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  image: {
    type: String,
    default: '/uploads/example.jpeg',
    trim: true,
  },
  size: {
    type: String,
    enum: ['S', 'M', 'L', 'XL', 'XXL', null],
  },
}, {
  ...BaseSchema.options,
  timestamps: true
})

export default mongoose.model<IJacket>('Jacket', JacketSchema) 