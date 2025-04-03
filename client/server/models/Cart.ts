import mongoose from 'mongoose'
import { BaseDocument, BaseSchema } from './BaseModel'
import { IUser } from './User'

export type ProductType = 'Sweat' | 'Bottom' | 'Shirt' | 'Accessory' | 'Shoe' | 'Jacket'
export type Size = 'S' | 'M' | 'L' | 'XL' | 'XXL' | null

export interface ICart extends BaseDocument {
  user: mongoose.Types.ObjectId | IUser
  product: mongoose.Types.ObjectId
  productType: ProductType
  size?: Size
  quantity: number
  deletedAt?: Date
}

const CartSchema = new mongoose.Schema<ICart>({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  product: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    refPath: 'productType',
  },
  productType: {
    type: String,
    required: true,
    enum: ['Sweat', 'Bottom', 'Shirt', 'Accessory', 'Shoe', 'Jacket']
  },
  size: {
    type: String,
    enum: ['S', 'M', 'L', 'XL', 'XXL', null],
    required: function() {
      return this.productType !== 'Accessory'
    }
  },
  quantity: {
    type: Number,
    required: true,
    min: 1,
    default: 1
  },
  deletedAt: { type: Date, default: null },
}, {
  ...BaseSchema.options,
  timestamps: true
})

// Uniqueness constraint
CartSchema.index({ user: 1, product: 1, productType: 1, size: 1 }, { unique: true })

export default mongoose.model<ICart>('Cart', CartSchema) 