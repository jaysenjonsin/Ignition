const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

const protect = async (req, res, next) => {
  let token;
  if (
    //the token is stored in the request header authorization object
    //remember in postman, where we paste the token
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      //token is stored like: Bearer <token>
      token = req.headers.authorization.split(' ')[1];

      //verifying token. we can now get our payload from decoded
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      // console.log('decoded --> ', decoded);
      //decoded -->  { id: '6392d7542f13e130045be63b', iat: 1670567764, exp: 1673159764 } <-- rememeber, the payload we set on the token was the id

      //since our payload was the id, we can find the user with the decoded id
      req.user = await User.findById(decoded.id).select('-password'); //<-- dont need to return the user's password. use .select('- <anything>')
      // console.log('req.user from protect: ', req.user);
      return next();
    } catch (err) {
      console.log(err);
      res.status(401);
      throw new Error('User not authorized');
    }
  }
  if (!token) {
    res.status(401).json({ message: 'User not authorized: no token' });
  }
};

module.exports = { protect };
