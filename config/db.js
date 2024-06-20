/* eslint-disable no-console */
const mongoose = require('mongoose');

const db = "mongodb+srv://yhunghabey1994:eBd1PPn0yd7Tb3Q8@cluster0.hktqnxk.mongodb.net/";


const connectDB = async () => {
  try {
    await mongoose.set('strictQuery', false); // Set it to true or false as needed
    await mongoose.connect(db, {
      //useNewUrlParser: true,
      //useUnifiedTopology: true,
    });

    console.log("MongoDB Connected....");
  } catch (err) {
    console.log(`MongoDB connection failed due to: ${err.message}`);
    console.error(err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
