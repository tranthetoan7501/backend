const mongoose = require('mongoose');
mongoose.set('strictQuery', true);
const connectDB = async () => {
  console.log(
    'url database: ',
    process.env.DATABASE ||
      'mongodb+srv://tranthetoan:752001@cluster0.qcztah8.mongodb.net/bloger?retryWrites=true&w=majority'
  );
  const conn = await mongoose.connect(
    process.env.DATABASE ||
      'mongodb+srv://tranthetoan:752001@cluster0.qcztah8.mongodb.net/bloger?retryWrites=true&w=majority'
  );
  console.log(`MongoDB Connected: ${conn.connection.host}`);
};

module.exports = connectDB;
