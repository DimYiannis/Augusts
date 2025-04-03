import mongoose from 'mongoose'
import validator from 'validator'
import bcrypt from 'bcryptjs'

export interface IUser {
  name: string
  email: string
  password: string
  role: 'admin' | 'user'
  info?: string
  profileImg?: string
  backgroundImg?: string
  verified?: Date
  passwordToken?: string
  passwordTokenExpirationDate?: Date
  verificationToken?: string
  isVerified: boolean
}

interface IUserMethods {
  comparePassword(candidatePassword: string): Promise<boolean>
}

type UserModel = mongoose.Model<IUser, {}, IUserMethods>

const UserSchema = new mongoose.Schema<IUser, UserModel, IUserMethods>({
  name: {
    type: String,
    required: [true, "Please provide name"],
    minlength: 3,
    maxlength: 50,
  },
  email: {
    type: String,
    unique: true,
    required: [true, "Please provide email"],
    validate: {
      validator: validator.isEmail,
      message: "Please provide valid email",
    },
  },
  password: {
    type: String,
    required: [true, "Please provide password"],
    minlength: 5,
  },
  role: {
    type: String,
    enum: ["admin", "user"],
    default: "user",
  },
  info: {
    type: String,
  },
  profileImg: {
    type: String,
    default: '/uploads/example.jpeg',
  },
  backgroundImg: {
    type: String,
    default: '/uploads/example.jpeg',
  },
  verified: Date,
  passwordToken: {
    type: String,
  },
  passwordTokenExpirationDate: {
    type: Date,
  },
  verificationToken: String,
  isVerified: {
    type: Boolean,
    default: false,
  },
})

UserSchema.pre("save", async function () {
  if (!this.isModified('password')) return
  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password, salt)
})

UserSchema.methods.comparePassword = async function (candidatePassword: string) {
  return await bcrypt.compare(candidatePassword, this.password)
}

export default mongoose.model<IUser, UserModel>("User", UserSchema) 