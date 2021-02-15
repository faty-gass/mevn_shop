const express = require('express')
//const app = express();
const router = express.Router();

const UserSchema = require('./user-model')
const ProductSchema = require('./product-model')

router.get('/test', (req, res) => {
  res.send('test')
})


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
      res.send({message : "Product deleted"})
    } else {
      res.send({message : "Product not found"})
    }
  } catch (e){
    console.error(e);
    res.sendStatus(500)
  }
})


// ---------------------- User Routes -----------------------//
// create new user
router.post('/users', (req, res) => {
  res.send('test')
})

// update user w/ id
router.patch('/user/:id', (req, res) => {
  res.send('test')
})

// delete user w/ id
router.delete('/user/:id', (req, res) => {
  res.send('test')
})

// get all users
router.get('/users', (req, res) => {
  res.send('test')
})

// get one user w/ id
router.get('/user/:id', (req, res) => {
  res.send('test')
})

module.exports = router