const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const passport = require('passport');
const passportStrategy = require('./middleware/passport');
const connectDb = require('./config/connectDB');
dotenv.config({ path: './config/config.env' });
const errorHandler = require('./middleware/error');

const app = express();

connectDb();
const PORT = process.env.PORT || 5000;
app.use(express.json());

app.use(passport.initialize());
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}
const route = require('./routes');
const { mongo, default: mongoose } = require('mongoose');

route(app);
app.use(errorHandler);
app.listen(
  PORT,
  console.log(
    `Server is running in ${process.env.NODE_ENV} mode on port ${PORT}`
  )
);
