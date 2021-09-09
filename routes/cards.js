const cards = require('express').Router();
const { getCards, deleteCard, postCard} = require('../controllers/cards');

cards.get('/', getCards);
cards.post('/', postCard);
cards.delete('/:cardId', deleteCard);

module.exports = {cards};