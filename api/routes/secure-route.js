const express = require('express')

const router = express.Router();

const UserSchema = require('../models/user-model')

// get connected user info
router.get('/profile', (req, res, next) => {
  res.json({
    message: 'You made it to the secure route',
    user: req.user,
    token: req.query.secret_token
  })
}
);

module.exports = router