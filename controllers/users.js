
const User = require('../models/user');

module.exports.getUsers = (req, res) => {
  User.find({})
    .then(users => res.status(200).send({data: users}))
    .catch(err => res.status(500).send({message: err.message}));
};

module.exports.getUserById = (req, res) => {
  User.findById(req.params.userId)
    .then(user => res.send({data: user}))
    .catch(err => res.status(500).send({message: 'Произошла ошибка'}))
}

module.exports.createUser = (req, res) => {
  const {name, about, avatar} = req.body;

  User.create({name, about, avatar})
    .then(user => res.status(201).send({data: user}))
    .catch(err => res.status(500).send({message: err.message}));
};