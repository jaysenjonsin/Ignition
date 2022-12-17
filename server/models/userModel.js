const { Schema, model } = require('mongoose');

const userSchema = new Schema(
  {
    role: {
      type: String,
      enum: ['test', 'doctor', 'MA', 'NP', 'PA', 'patient'],
      message: 'invalid role',
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = model('User', userSchema);
