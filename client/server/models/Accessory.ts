import mongoose from 'mongoose'
import { BaseDocument, BaseSchema } from './BaseModel'

export interface IAccessory extends BaseDocument {
  name: string
  price: number
  image: string
  quantity: number
}

const AccessorySchema = new mongoose.Schema<IAccessory>({
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
  quantity: {
    type: Number,
    required: true,
    min: 0,
  },
}, {
  ...BaseSchema.options,
  timestamps: true
})

export default mongoose.model<IAccessory>('Accessory', AccessorySchema) 