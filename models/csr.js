const mongoose = require('mongoose');

const csrSchema = new mongoose.Schema({

  title: {
    type: String, 
  },

  image: {
    type: String,
  },

  description: {
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

const Csr = mongoose.model('csr', csrSchema);

module.exports = {
    Csr,
};
