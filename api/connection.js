//Import the mongoose module
const mongoose = require('mongoose');

mongoose.set('useCreateIndex', true);

async function main(){
  const mongoDB = 'mongodb+srv://dbuser:dbpassword@cluster0.lgimg.mongodb.net/myshop?retryWrites=true&w=majority';
  try {
    await mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true});
    console.log("Connected to mongo!")
  }catch (e){
    console.error(e)
  }
}


module.exports = main;