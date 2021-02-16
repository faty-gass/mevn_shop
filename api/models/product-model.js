const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ProductSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  isVisible : {
    type: Boolean,
    default : true
  }
});

const ProductModel = mongoose.model('product', ProductSchema);

module.exports = ProductModel;