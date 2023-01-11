const usersRoute = require('./user');
const authRoute = require('./auth');

function route(app) {
  app.use('/api/user', usersRoute);
  app.use('/api/auth', authRoute);
}

module.exports = route;
