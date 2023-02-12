const express = require('express');
const router = express.Router();
const {
  uploadImg,
  createPost,
  getPost,
} = require('../controller/post/postController');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const passport = require('passport');

router
  .route('/getPost')
  .get(passport.authenticate('jwt', { session: false }), getPost);
router
  .route('/create')
  .post(passport.authenticate('jwt', { session: false }), createPost);
router.route('/upload').post(upload.single('myFile'), uploadImg);

module.exports = router;
