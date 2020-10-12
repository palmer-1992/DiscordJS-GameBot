const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  discordID: {
    type: String,
    required: true
  }
})

module.exports = mongoose.model('users', UserSchema)