require('dotenv').config();

//import data from json file
const {jackets, accessories, shoes} = require('./db/apparel.json');
// import models from apparel.js
const {Jackets, Accessories, Shoes} = require('./models/Apparel');
const connectDB = require('./db/connect');

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL);

    // Populate each collection
    await Jackets.create(jackets);
    await Accessories.create(accessories);
    await Shoes.create(shoes);

    console.log('Success !!!');
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

start();
