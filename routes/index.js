const usersRoute = require('./user');

function route(app) {
  app.use('/api/user', usersRoute);
}

module.exports = route;
