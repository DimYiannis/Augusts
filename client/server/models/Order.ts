import mongoose from 'mongoose'
import { BaseDocument, BaseSchema } from './BaseModel'
import { IUser } from './User'

export type OrderStatus = 'pending' | 'failed' | 'paid' | 'delivered' | 'canceled'

export interface ISingleOrderItem {
  name: string
  image: string
  price: number
  amount: number
  product: mongoose.Types.ObjectId
}

export interface IOrder extends BaseDocument {
  total: number
  orderItems: ISingleOrderItem[]
  status: OrderStatus
  user: mongoose.Types.ObjectId | IUser
  clientSecret: string
  paymentIntentId?: string
}

const SingleOrderItemSchema = new mongoose.Schema<ISingleOrderItem>({
  name: { type: String, required: true },
  image: { type: String, required: true },
  price: { type: Number, required: true },
  amount: { type: Number, required: true },
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true,
  },
})

const OrderSchema = new mongoose.Schema<IOrder>({
  total: {
    type: Number,
    required: true,
  },
  orderItems: [SingleOrderItemSchema],
  status: {
    type: String,
    enum: ['pending', 'failed', 'paid', 'delivered', 'canceled'],
    default: 'pending',
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  clientSecret: {
    type: String,
    required: true,
  },
  paymentIntentId: {
    type: String,
  },
}, {
  ...BaseSchema.options,
  timestamps: true
})

export default mongoose.model<IOrder>('Order', OrderSchema) 