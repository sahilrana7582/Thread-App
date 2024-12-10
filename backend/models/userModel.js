const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = mongoose.Schema({
  username: {
    type: String,
    min: [1, 'Need Atleast One Character'],
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    min: [4, 'Password Should be Atleast 4 Charactors'],
    required: true,
  },
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  profilePicUrl: String,
  bio: String,
});

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();

  const hash = await bcrypt.hash(this.password, 5);

  this.password = hash;
  next();
});

const User = mongoose.model('User', userSchema);
module.exports = User;
