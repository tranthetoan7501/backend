const mongoose = require('mongoose');
const Post = mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please add a title'],
    trim: true,
    maxlength: [100, 'Title can not be more than 60 characters'],
  },
  category: {
    type: String,
    enum: ['Study', 'Society'],
    default: 'Study',
  },
  description: {
    type: String,
    default: 'Không chưa nội dung',
  },
  image: {
    type: String,
    default:
      'https://res.cloudinary.com/dcojxsjnw/image/upload/v1676176657/postImage.jpg',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  owner: {
    type: {
      id: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
      username: String,
    },
    required: [true, 'Please add owner'],
  },
});

module.exports = mongoose.model('Post', Post);
