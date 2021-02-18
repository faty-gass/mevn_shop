const express = require('express')
const passport = require('passport');
const jwt = require('jsonwebtoken');
const router = express.Router();

const UserSchema = require('../models/user-model')
const ProductSchema = require('../models/product-model')


// ------------ Product Routes ------------------//
// get all products
router.get('/products', async (req, res) => {
  try {
    const allProd = await ProductSchema.find();
    res.send(allProd)
  } catch (e){
    console.error(e);
    res.sendStatus(500)
  }
})

//get 1 prod w/ id
router.get('/product/:id', async (req, res) => {
  try {
    const prod = await ProductSchema.findById(req.params.id);
    if (prod){
      res.send(prod)
    } else {
      res.send({message : "Product not found"})
    }
    
  } catch (e){
    console.error(e);
    res.sendStatus(500)
  }
})

//create new product
router.post('/products', async (req, res) => {
  const newProd = new ProductSchema(req.body);
  try {
    await newProd.save();
    res.send({message : "New product created", product : newProd})
  } catch (e){
    console.error(e);
    res.sendStatus(500)
  }
})

//update product w/ id
router.patch('/product/:id', async (req, res) => {
  try {
    const prod = await ProductSchema.findByIdAndUpdate(req.params.id,req.body, {useFindAndModify : false, new: true});
    if (prod){
      res.send({message : "Product updated", product : prod})
    } else {
      res.send({message : "Product not found"})
    }
    
  } catch (e){
    console.error(e);
    res.sendStatus(500)
  }
})

//delete product w/ id
router.delete('/product/:id', async (req, res) => {
  try {
    const prod = await ProductSchema.findOneAndDelete({_id :req.params.id});
    if (prod){
      res.send({message : "Product deleted", prod})
    } else {
      res.send({message : "Product not found"})
    }
  } catch (e){
    console.error(e);
    res.sendStatus(500)
  }
})


// ---------------------- User Routes -----------------------//
// create new user, register
router.post( '/signup', passport.authenticate('signup', { session: false }),
  async (req, res, next) => {
    res.json({
      message: 'Signup successful',
      user: req.user
    });
  }
);

// login
router.post('/login', async (req, res, next) => {
  passport.authenticate(
    'login',
    async (err, user, info) => {
      try {
        if (err || !user) {
          const error = new Error('An error occurred.');

          return next(error);
        }

        req.login(
          user,
          { session: false },
          async (error) => {
            if (error) return next(error);

            const body = { _id: user._id, email: user.email, name: user.name };
            const token = jwt.sign({ user: body }, 'TOP_SECRET');

            return res.json({ token });
          }
        );
      } catch (error) {
        return next(error);
      }
    }
  )(req, res, next);
});





module.exports = router