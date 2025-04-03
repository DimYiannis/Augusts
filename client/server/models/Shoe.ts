import mongoose from 'mongoose'
import { BaseDocument, BaseSchema } from './BaseModel'

export interface IShoe extends BaseDocument {
  name: string
  price: number
  image: string
  size?: 'S' | 'M' | 'L' | 'XL' | 'XXL' | null
}

const ShoeSchema = new mongoose.Schema<IShoe>({
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
    default: "/uploads/example.jpeg",
    trim: true,
  },
  size: {
    type: String,
    enum: ["S", "M", "L", "XL", "XXL", null],
  },
}, {
  ...BaseSchema.options,
  timestamps: true
})

export default mongoose.model<IShoe>('Shoe', ShoeSchema) 