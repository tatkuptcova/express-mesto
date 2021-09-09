
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

module.exports.updateUser = (req, res) =>{
  User.findByIdAndUpdate(req.user._id, {name: req.body.name, about: req.body.about},
    { new: true, runValidators: true})
    .then((user) => {
      if(!user){
        return res.status(404).send({ message: "Запрашиваемый пользователь не найден"})
      }
          return res.status(200).send({data: user})
        })
    .catch((err) => {
      if(err.name === "ValidationError" || err.name === "CastError"){
       return res.status(400).send({ message: "Произошла ошибка валидации"}
        )} else res.status(500).send(`Произошла ошибка: ${err.name} ${err.message}`)
    });
}

module.exports.updateAvatar = (req, res) =>{
  User.findByIdAndUpdate(req.user._id, {avatar: req.body.avatar},
    { new: true, runValidators: true})
    .then((user) => {
      if(!user){
        return res.status(404).send({ message: "Запрашиваемый пользователь не найден"})
      }
      return res.status(200).send({data: user})
    })
    .catch((err) => {
        if(err.avatar === "ValidationError" || err.avatar === "CastError"){
          return res.status(400).send({ message: "Произошла ошибка валидации"}
          )} else res.status(500).send(`Произошла ошибка: ${err.name} ${err.message}`)
      })
}
