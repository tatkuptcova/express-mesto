const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const usersRouter = require('./routes/users');

const { port = 3000 } = process.env;
const app = express();

app.use(bodyParser.json()); // для собирания JSON-формата
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect('mongodb://localhost:27017/mestodb')

app.use('/users', usersRouter);

app.use((req, res, next) => {
  req.user = {
    _id: '61391fe4274ebb0b160f232c' // вставьте сюда _id созданного в предыдущем пункте пользователя
  };

  next();
});

app.listen(port, () => {
  console.log(`Сервер запущен на порту ${port}`)
})