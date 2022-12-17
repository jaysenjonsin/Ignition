const Task = require('../models/taskModel');
const User = require('../models/userModel');

const taskController = {
  createTask: async (req, res, next) => {
    const { receiver, patient, medication, pharmacy } = req.body;

    try {
      if (!receiver || !patient || !medication || !pharmacy) {
        res.status(400);
        throw new Error('Please enter all required fields');
      }

      //confirm receiver exists in DB
      const receiverExists = await User.findById(receiver);
      //for some reason in post man if you put a wrong receiver it isnt throwing correct error --> same for patient
      if (!receiverExists) {
        res.status(400);
        throw new Error('Recipient does not exist.');
      }

      //confirm patient exists in DB
      const patientExists = await User.findById(patient);
      if (!patientExists) {
        res.status(400);
        throw new Error('patient does not exist.');
      }
      const senderData = await User.findById(req.user.id, { name: 1 });
      const task = await Task.create({
        //have access to req.user through protect middleware
        //pasted waht is being sent back on the bottom
        sender: senderData,
        //make sure request sends id of receiver
        receiver,
        patient,
        medication,
        pharmacy,
      });

      res.status(200).json(task);
    } catch (err) {
      console.log(err);
      return next(err);
    }
  },

  getTasks: async (req, res, next) => {
    try {
      //note: .find() returns ALL matching documents. so we will get all tasks that have a sender value of req.user.id
      const sentTasks = await Task.find({ sender: req.user.id });
      const receivedTasks = await Task.find({ receiver: req.user.id });
      //not sure if will need patient Tasks
      const patientTasks = await Task.find({ patient: req.user.id });
      const allTasks = sentTasks.concat(receivedTasks).concat(patientTasks);
      res.status(200).json(allTasks);
    } catch (err) {
      console.log(err);
      return next(err);
    }
  },

  updateTask: async (req, res, next) => {
    const { sender, receiver, patient, medication, pharmacy } = req.body;

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
      const receiverExists = User.findById(receiver);
      if (!receiverExists) {
        res.status(400);
        throw new Error('receiver does not exist');
      }

      const patientExists = User.findById(patient);
      if (!patientExists) {
        res.status(400);
        throw new Error('patient does not exist');
      }

      //ENSURE USER IS AUTHORIZED: only receiver and sender can update task --> not sure if necessary since this goes through protect middleware
      // console.log('task.sender --> ', task.sender.toString());
      // console.log('task.receiver --> ', task.receiver.toString());
      // console.log('req.user.id --> ', req.user.id);
      if (
        //task.sender and receiver are numbers, so convert to string
        task.sender.toString() == req.user.id ||
        task.receiver.toString() == req.user.id
      ) {
        const updatedTask = await Task.findByIdAndUpdate(
          req.params.id,
          req.body,
          { new: true }
        );

        res.status(200).json({ message: `updated task : ${updatedTask}` });
      } else {
        res.status(400);
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
        task.receiver.toString() == req.user.id
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

//what is sent in getTasks: 

// {
//   "sender": {
//       "_id": "6392f08acb342622cf7abfb2",
//       "name": "tester"
//   },
//   "receiver": "6392f0b29f31cc6b9c7a3305",
//   "patient": "6392f3a9406dad264d9229ad",
//   "medication": "pathpathpath",
//   "pharmacy": "Walgreens",
//   "_id": "639e44693e98d9eb50c00378",
//   "createdAt": "2022-12-17T22:36:25.189Z",
//   "updatedAt": "2022-12-17T22:36:25.189Z",
//   "__v": 0
// }


//test documents:

// 1:
//{
//     "_id": "6392f08acb342622cf7abfb2",
//     "role": "tester",
//     "name": "tester",
//     "email": "tester",
//     "username": "tester",
//     "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzOTJmMDhhY2IzNDI2MjJjZjdhYmZiMiIsImlhdCI6MTY3MDU3NDIxOCwiZXhwIjoxNjczMTY2MjE4fQ.Ks-JUU3zKyTS-AUvOzeA7xs_a8Fc1DgXrIgHLqFMusI"
// }

//2:
//{
//   "_id": "6392f0b29f31cc6b9c7a3305",
//   "role": "tester2",
//   "name": "tester2",
//   "email": "tester2",
//   "username": "tester2",
//   "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzOTJmMGIyOWYzMWNjNmI5YzdhMzMwNSIsImlhdCI6MTY3MDU3NDI1OCwiZXhwIjoxNjczMTY2MjU4fQ._4OCuHvqZnOaNxAnlF3RbqUZMPFhUqG_DGy1tt5-k_M"
// }

//3:
//{
//   "_id": "6392f3a9406dad264d9229ad",
//   "role": "tester3",
//   "name": "tester3",
//   "email": "tester3",
//   "username": "tester3",
//   "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzOTJmM2E5NDA2ZGFkMjY0ZDkyMjlhZCIsImlhdCI6MTY3MDU3NTAxNywiZXhwIjoxNjczMTY3MDE3fQ.P8IQF5cH7EZl4vhwW3dEJTHH2N6kLF9qeYiozP_YNXo"
// }
