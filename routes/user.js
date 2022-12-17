const express = require('express');
const router = express.Router();

const { getUser } = require('../controller/user/userController');

router.route('/').get(getUser);

module.exports = router;
