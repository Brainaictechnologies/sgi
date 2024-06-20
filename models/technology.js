const mongoose = require('mongoose');

const technologySchema = new mongoose.Schema({

  title1: {
    type: String, 
  },

  title2: {
    type: String, 
  },

  title3: {
    type: String, 
  },

  title4: {
    type: String, 
  },

  title5: {
    type: String, 
  },

  title6: {
    type: String, 
  },

  title7: {
    type: String, 
  },

  title8: {
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

  description7: {
    type: String,
  },

  description8: {
    type: String,
  },

  author: {
    type: String,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },

});

const Technology = mongoose.model('technology', technologySchema);

module.exports = {
    Technology,
};
