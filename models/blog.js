const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({

  title1: {
    type: String, 
  },

  title2: {
    type: String, 
  },

  description1: {
    type: String,
  },

  description2: {
    type: String,
  },

  description3: {
    type: String,
  },

  description4: {
    type: String,
  },

  description5: {
    type: String,
  },

  description6: {
    type: String,
  },
  author: {
    type: String,
  },

  image: {
    type: String,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },


});

const Blog = mongoose.model('blog', blogSchema);

module.exports = {
  Blog,
};
