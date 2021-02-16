const express = require('express')
const bcrypt = require('bcrypt')
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

// update user w/ id
router.patch('/edit/:id', async( req, res) => {
  try {
    if (req.body.password){
      const hash = await bcrypt.hash(req.body.password, 10);
      req.body.password = hash
    }
    const user = await UserSchema.findByIdAndUpdate(req.params.id, req.body, {useFindAndModify : false, new: true});
    if (user){
      res.send({message : "User updated", user})
    } else {
      res.send({message : "User not found"})
    }
    
  } catch (e){
    console.error(e);
    res.sendStatus(500)
  }
})

// delete user w/ id
router.delete('/delete/:id', async (req, res) => {
  try {
    const user = await UserSchema.findOneAndDelete({_id :req.params.id});
    if (user){
      res.send({message : "User deleted"})
    } else {
      res.send({message : "User not found"})
    }
  } catch (e){
    console.error(e);
    res.sendStatus(500)
  }
})

// get all users
router.get('/show-all', async (req, res) => {
  try {
    const allUser = await UserSchema.find();
    res.send(allUser)
  } catch (e){
    console.error(e);
    res.sendStatus(500)
  }
})

module.exports = router