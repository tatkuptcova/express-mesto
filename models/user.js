const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: true,
  },
  about: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: true,
  },
  avatar: {
    type: String,
    required: true,
    validate: {
      validator(v) {
        return /^(http:\/\/|https:\/\/)w*\w/.test(v);
      },
      message: 'Ссылка в некорректном формате',
    },
  },
},
{
  versionKey: false,
});

module.exports = mongoose.model('user', userSchema);