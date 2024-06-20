const mongoose = require('mongoose');

const whoWeAreSchema = new mongoose.Schema({

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

const WhoWeAre = mongoose.model('whoweare', whoWeAreSchema);

module.exports = {
    WhoWeAre,
};
