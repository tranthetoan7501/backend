const mongoose = require('mongoose');
mongoose.set('strictQuery', true);
const connectDB = async () => {
  console.log('url database: ', process.env.DATABASE);
  const conn = await mongoose.connect(process.env.DATABASE);
  console.log(`MongoDB Connected: ${conn.connection.host}`);
};

module.exports = connectDB;
