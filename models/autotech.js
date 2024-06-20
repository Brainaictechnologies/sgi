const mongoose = require('mongoose');

const autotechSchema = new mongoose.Schema({

  title1: {
    type: String, 
  },

  title2: {
    type: String, 
  },

  title3: {
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

  author: {
    type: String,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },

});

const Autotech = mongoose.model('autotech', autotechSchema);

module.exports = {
    Autotech,
};
