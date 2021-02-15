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
router.get('/products', (req, res) => {
  res.send('test')
})

//get 1 prod w/ id
router.get('/product/:id', (req, res) => {
  res.send('test')
})

//create new product
router.post('/products', (req, res) => {
  res.send('test')
})

//update product w/ id
router.patch('/edit-product/:id', (req, res) => {
  res.send('test')
})

//delete product w/ id
router.delete('/product/:id', (req, res) => {
  res.send('test')
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