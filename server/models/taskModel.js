const { Schema, model } = require('mongoose');

const taskSchema = new Schema(
  {
    sender: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    receiver: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    //who the task is about
    patient: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },

    //these would be foreign keys. setting as strings for now
    medication: {
      type: String,
      required: true,
    },
    pharmacy: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = model('Task', taskSchema);
