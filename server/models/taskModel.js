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
    status: {
      type: String,
      default: 'pending',
    },
    reason: {
      type: String,
      //if no reason sent, it just has default ''. all other logic will not have reason as a required field
      default: '',
    },
  },
  { timestamps: true }
);

module.exports = model('Task', taskSchema);
