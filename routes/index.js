const usersRoute = require('./user');
const authRoute = require('./auth');
const postRoute = require('./post');

function route(app) {
  app.use('/api/user', usersRoute);
  app.use('/api/auth', authRoute);
  app.use('/api/post', postRoute);
}

module.exports = route;
