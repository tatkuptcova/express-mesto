const express = require('express');
const mongoose = require('mongoose');

const { port = 3000 } = process.env;
const app = express();

mongoose.connect('mongodb://localhost:27017/mestodb')

app.listen(port, () => {
  console.log(`Сервер запущен на порту ${port}`)
})