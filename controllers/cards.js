const Card = require('../models/card')

module.exports.getCards = (req, res) => {
  Card.find({})
    .then(cards => res.send({data: cards}))
    .catch(err => res.status(500).send({err: err.message}))
};

module.exports.postCard = (req, res) => {
  const { name, link} = req.body;
  const owner = req.user._id;

  Card.create({name, link, owner})
    .then(card => res.status(201).send({data: card}))
    .catch((err) => {
      if(err.name || err.link || err.owner === "ValidationError"){
        res.status(400).send({ message: "Произошла ошибка валидации"})
      }
      res.status(500).send(`Произошла ошибка: ${err.name} ${err.message}`)
    });
};

module.exports.deleteCard = (req, res) => {
  Card.findOneAndDelete(req.params.cardId)
    .then((card) => {
      if(card !== null){
        res.status(200).send({data: card})
      } else { res.status(404).send({ message: "Данной карточки не существует"})}
      })
    .catch(err => res.status(500).send({err: err.message}))
};