const asyncHandler = require('../../middleware/async');
const ErrorResponse = require('../../utils/errorResponse');
const { Res } = require('../../utils/response');
const { uploadImg } = require('../../utils/uploadImage');
const fs = require('fs');
const Post = require('../../model/post');

exports.uploadImg = asyncHandler(async (req, res, next) => {
  const result = await uploadImg(req.file.path, 'postImage');
  fs.unlink(req.file.path, (err) => {
    if (err) {
      console.error(err);
    }
    console.log(`${req.file.path} was deleted.`);
  });
  console.log(req.file.path);
  Res(result, res);
});

exports.createPost = asyncHandler(async (req, res, next) => {
  req.body.owner = { id: req.user.id, username: req.user.username };
  const post = await Post.create(req.body);
  Res(post, res);
});

exports.getPost = asyncHandler(async (req, res, next) => {
  const pageSize = process.env.PAGE_SIZE;
  const pageNum = req.query.page ? req.query.page : 1;
  console.log('fsdfsdfsdfdsfs', pageNum);
  const posts = await Post.find({})
    .skip((pageNum - 1) * pageSize)
    .limit(pageSize);
  Res(posts, res);
});
