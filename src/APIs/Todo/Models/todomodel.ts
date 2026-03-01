import { Schema, model, Document,Types } from 'mongoose'

// 1️⃣ Interface
export interface ITodo extends Document {
  title: string
  description: string
  userId: Types.ObjectId
}

// 2️⃣ Schema
const todoSchema = new Schema<ITodo>(
  {
    title: {
      type: String,
      required: true,
      trim: true
    },
    description: {
      type: String,
      required: true,
      trim: true
    },
     userId: { type: Schema.Types.ObjectId, ref: 'user', required: true }
  },
  {
    timestamps: true
  }
)

// 3️⃣ Model Export
const Todo = model<ITodo>('Todo', todoSchema)

export default Todo