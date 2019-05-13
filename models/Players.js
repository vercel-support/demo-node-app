const mongoose = require('mongoose');

const playersSchema = new mongoose.Schema({
  firstname: {
    type: String,
    trim: true,
  },
  lastname: {
    type: String,
    trim: true,
  },
  team: {
    type: String,
    trim: true,
  },
  position: {
    type: String,
    trim: true,
  },
});

module.exports = mongoose.model('Players', playersSchema);
