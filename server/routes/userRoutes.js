const express = require('express');
const router = express.Router();
const {
  registerUser,
  loginUser,
  getMe,
  updateUser,
  deleteUser,
  getAllUsers,
} = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');

//make sure to generate and send token for both registering and logging in
router.route('/').get(getAllUsers).post(registerUser);
router.post('/login', loginUser);
router.route('/:id').delete(protect, deleteUser).put(protect, updateUser);
// router.delete('/:id', protect, deleteUser);

//testing protected route --> all functions after protect have access to the user through req.user!
router.get('/me', protect, getMe);

module.exports = router;
