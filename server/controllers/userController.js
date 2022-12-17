const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/userModel');
const userController = {
  //make sure all fields filled, user doesnt exist already, hash password, generate token
  registerUser: async (req, res, next) => {
    //this will say 'cannot destrucure role because it is undefined' if we do not use app.json() and app.urlencoded() in our server.js
    const { role, name, email, username, password } = req.body;
    try {
      if (!role || !name || !email || !username || !password) {
        res.status(400);
        throw new Error('please add all required fields');
      }
      const userEmailExists = await User.findOne({ email });
      const usernameExists = await User.findOne({ username });
      if (userEmailExists || usernameExists) {
        res.status(400);
        throw new Error('user already exists');
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const user = await User.create({
        role,
        name,
        email,
        username,
        //don't store plain text password in db
        password: hashedPassword,
      });

      // not sure if needed? : req.user = user -> don't need because this is the last func in middleware chain, don't need to persist req.user here

      //sending this to frontend to use later
      res.status(201).json({
        _id: user.id, // <-- in mongo, can access _id with .id. so we couldv'e also said _id: user._id, doesn't matter here
        role: user.role,
        name: user.name,
        email: user.email,
        username: user.username,
        //not sure why but using this.generateToken doesn't work
        token: userController.generateToken(user._id),
      });
    } catch (err) {
      console.log(err);
      return next(err);
    }
  },

  loginUser: async (req, res, next) => {
    //Only using username and password on login page
    const { username, password } = req.body;
    try {
      if (!username || !password) {
        res.status(400);
        throw new Error('please enter all fields');
      }
      const user = await User.findOne({ username });
      console.log(password);
      // console.log('crypt password', user.password);
      //compare req.body.password and password from db
      //dont forget to await the hash
      if (user && await bcrypt.compare(password, user.password)) {
        res.status(200).json({
          _id: user.id,
          role: user.role,
          name: user.name,
          email: user.email,
          username: user.username,
          token: userController.generateToken(user._id),
        });
      } else {
        res.status(400);
        throw new Error(' username or password is incorrect');
      }
    } catch (err) {
      console.log(err);
      return next(err);
    }
  },

  getMe: async (req, res) => {
    res.status(200).json(req.user);
  },

  //a generalized update function that updates. can update all information in one func
  updateUser: async (req, res, next) => {
    const { role, name, email, username, password } = req.body;
    try {
      const user = User.findById(req.params.id);
      if (!user) {
        res.status(400);
        throw new Error('user not found');
      }
      if (!role || !name || !email || !username || !password) {
        res.status(400);
        throw new Error('please include all fields');
      }
      const updatedUserInfo = await User.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );
      res
        .status(200)
        .json({ message: `updated user information to: ${updatedUserInfo}` });
    } catch (err) {
      console.log(err);
      return next(err);
    }
  },

  deleteUser: async (req, res, next) => {
    try {
      const user = await User.findById(req.params.id);
      //since we have access to req.user, can also find user by doing something like await User.find({username: req.user.username})
      if (!user) {
        res.status(400);
        throw new Error('user does not exist');
      }
      res.status(200).json({ id: req.params.id });
    } catch (err) {
      console.log(err);
      return next(err);
    }
  },

  getAllUsers: async (_, res, next) => {
    try {
      //to get all documents in a collection, use  Model.find({});
      const users = await User.find({}).select('role name email username');
      res.status(200).json(users);
    } catch (err) {
      return next(err);
    }
  },

  //Generate JWT
  generateToken: (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
      expiresIn: '30d',
    });
  },
};

module.exports = userController;
