import mongoose from 'mongoose'

export const connectDB = async (url: string) => {
  try {
    await mongoose.connect(url)
    console.log('MongoDB connected successfully')
  } catch (error) {
    console.error('MongoDB connection error:', error)
    process.exit(1)
  }
} 