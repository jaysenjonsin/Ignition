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

router.route('/').get(getAllUsers).post(registerUser);
router.post('/login', loginUser);
router.route('/:id').delete(protect, deleteUser).put(protect, updateUser);

//testing protected route --> all functions after protect have access to the user through req.user!
router.get('/me', protect, getMe);

module.exports = router;
