const { update } = require('../models/taskModel');
const Task = require('../models/taskModel');
const User = require('../models/userModel');

const taskController = {
  createTask: async (req, res, next) => {
    const { receiver, patient, medication, pharmacy, reason } = req.body;

    try {
      //reason is not required
      if (!receiver || !patient || !medication || !pharmacy) {
        res.status(400);
        throw new Error('Please enter all required fields');
      }

      //confirm receiver exists in DB --> model.find returns AN ARRAY. we only want the first user that appears, so grab the 0th element
      const receiverExists = await User.find({ name: receiver });
      //for some reason in post man if you put a wrong receiver it isnt throwing correct error --> same for patient
      if (!receiverExists[0]) {
        res.status(400);
        throw new Error('Recipient does not exist.');
      }

      //confirm patient exists in DB --> model.find returns an ARRAY!!!!
      const patientExists = await User.find({ name: patient });
      if (!patientExists[0]) {
        res.status(400);
        throw new Error('patient does not exist.');
      }
      const task = await Task.create({
        //have access to req.user through protect middleware
        sender: req.user.id,
        //make sure request sends id of receiver
        receiver: receiverExists[0].id,
        patient: patientExists[0].id,
        medication,
        pharmacy,
        reason,
        status: 'pending',
      });

      res.status(200).json(task);
    } catch (err) {
      console.log(err);
      return next(err);
    }
  },

  getTasks: async (req, res, next) => {
    try {
      //instead of just getting the task itself (remember, task doesn't have the actual user's name, it only has the id), this is replacing the sender/receiver/patient with the actual data from the user model.
      const tasks = await Task.find({
        $or: [
          { sender: req.user.id },
          { receiver: req.user.id },
          { patient: req.user.id },
        ],
      })
        .populate('sender')
        .populate('receiver')
        .populate('patient');

      //we can now format each task to only include what we want, instead of including every detail about the sender, receiver, and patient. ex: instad of sender being the entire sender's data, we are only setting it here to the senders name (task.sender.name). so when user makes get requests for their tasks, they only see the name of who sent it instead of all the sender's info
      const formattedTasks = tasks.map((task) => {
        return {
          _id: task._id,
          sender: task.sender.name,
          senderId: task.sender._id,
          receiver: task.receiver.name,
          patient: task.patient.name,
          medication: task.medication,
          pharmacy: task.pharmacy,
          reason: task.reason,
          status: task.status,
          createdAt: task.createdAt,
          updatedAt: task.updatedAt,
          __v: task.__v,
        };
      });
      res.status(200).json(formattedTasks);
    } catch (err) {
      console.log(err);
      return next(err);
    }
  },

  updateTask: async (req, res, next) => {
    const { sender, receiver, patient, medication, pharmacy, reason, status } =
      req.body;

    try {
      const task = await Task.findById(req.params.id);

      if (!task) {
        res.status(400);
        throw new Error('task not found');
      }

      if (!sender || !receiver || !patient || !medication || !pharmacy) {
        res.status(400);
        throw new Error('Please enter all required fields');
      }

      //make sure if editing receiver, receiver exists in DB
      const receiverExists = await User.find({ name: receiver });
      if (!receiverExists[0]) {
        res.status(400);
        throw new Error('receiver does not exist');
      }

      const patientExists = await User.find({ name: patient });
      if (!patientExists[0]) {
        res.status(400);
        throw new Error('patient does not exist');
      }

      if (
        //ENSURE USER IS AUTHORIZED: only receiver and sender can update task
        //task.sender and receiver are numbers, so convert to string
        task.sender.toString() == req.user.id ||
        task.receiver.toString() == req.user.id
      ) {
        const updatedTask = await Task.findByIdAndUpdate(
          req.params.id,
          {
            sender,
            //front end is sending the name. remember, when creating task, we use their ID. so convert frontends input back to the id.
            receiver: receiverExists[0],
            patient: patientExists[0],
            medication,
            pharmacy,
            reason,
            status,
          },
          { new: true }
        )
          .populate('sender')
          .populate('receiver')
          .populate('patient'); ////make sure to put new true so const updatedTask is the updated task, not the old one.
        res.status(200).json({
          id: req.params.id,
          sender: updatedTask.sender.name,
          receiver: updatedTask.receiver.name,
          patient: updatedTask.patient.name,
          medication,
          pharmacy,
          reason,
          status,
          createdAt: updatedTask.createdAt,
        });
      } else {
        res.status(401);
        throw new Error('user not authorized to update task');
      }
    } catch (err) {
      console.log(err);
      return next(err);
    }
  },
  deleteTask: async (req, res, next) => {
    try {
      const task = await Task.findById(req.params.id);
      if (!task) {
        res.status(400);
        throw new Error('task not found');
      }
      //ENSURE USER IS AUTHORIZED: only sender and receiver can delete task
      if (
        task.sender.toString() == req.user.id ||
        task.receiver.toString() == req.user.id ||
        task.patient.toString() == req.user.id
      ) {
        await task.remove();
        res.status(200).json({ id: req.params.id });
      } else {
        res.status(401);
        throw new Error('Not authorized to delete task');
      }
    } catch (err) {
      console.log(err);
      return next(err);
    }
  },
};

module.exports = taskController;
