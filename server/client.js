import mongoose from 'mongoose'

const clientSchema = new mongoose.Schema({
  clinetname: {
    type: String,
    required: true,
  },
  clinetid: {
    type: String,
    required: true,
    unique: true,
  },
  priority: {
    type: String,
    default: 'Normal',
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
})

export const Client = mongoose.model('Client', clientSchema)
