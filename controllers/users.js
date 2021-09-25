const bcrypt = require('bcrypt');
const User = require('../models/user');

module.exports.login = (req, res) => {
  const { email, password } = req.body;

  User.findOne({ email })
    .then((user) => {
      if (!user) {
        return Promise.reject(new Error('Неправильные почта или пароль'));
      }

      return bcrypt.compare(password, user.password);
    })
    .then((matched) => {
      if (!matched) {
        // хеши не совпали — отклоняем промис
        return Promise.reject(new Error('Неправильные почта или пароль'));
      }

      // аутентификация успешна
      res.send({ message: 'Всё верно!' });
    })
    .catch((err) => {
      res
        .status(401)
        .send({ message: err.message });
    });
};


module.exports.getUsers = (req, res) => {
  User.find({})
    .then(users => res.status(200).send({data: users}))
    .catch(err => res.status(500).send({message: err.message}));
};

module.exports.getUserById = (req, res) => {
  User.findById(req.params.userId)
  .then((user) => {
    if (!user) {
      return res.status(404).send({ message: 'Пользователь по указанному _id не найден' });
    }
    return res.status(200).send(user);
  })
  .catch((err) => {
    if (err.name === 'CastError') {
      return res.status(400).send({ message: 'id юзера не валидный' });
    }
    return res.status(500).send({message: err.message});
  });
}

module.exports.createUser = (req, res) => {
  const {name, about, avatar, email, password} = req.body;
  console.log

  User.create({name, about, avatar, email, password})
    .then((user) => res.status(201).send({ data: user }))
    .catch((err) => {
      if (err.name === 'ValidationError' || err.name === 'CastError') {
        return res.status(400).send({ message: 'Данные не прошли валидацию' });
      }
      return res.status(500).send({message: err.message});
    });
};

module.exports.updateUser = (req, res) =>{
  User.findByIdAndUpdate(req.user._id, {name: req.body.name, about: req.body.about},
    { new: true, runValidators: true})
    .then((user) => {
      if(!user){
        return res.status(404).send({ message: 'Пользователь с указанным _id не найден' });
      }
        return res.status(200).send({data: user})
      })
    .catch((err) => {
      if(err.name === "ValidationError" || err.name === "CastError"){
        return res.status(400).send({ message: "Произошла ошибка валидации"});
      } else {
        res.status(500).send(`Произошла ошибка: ${err.name} ${err.message}`);
      }
    });
}

module.exports.updateAvatar = (req, res, next) => {
  User.findByIdAndUpdate(req.user._id, {avatar: req.body.avatar},
    { new: true, runValidators: true})
    .then((user) => {
      if(!user){
        return res.status(404).send({ message: 'Пользователь с указанным _id не найден' });
      }
      return res.status(200).send({data: user})
    })
    .catch((err) => {
      if (err.name === 'ValidationError' || err.name === 'CastError') {
        res.status(400).send({ message: 'Переданы некорректные данные при обновлении аватара.' });
      } else res.status(500).send({ message: 'На сервере произошла ошибка' });
    })
    .catch(next);
}
