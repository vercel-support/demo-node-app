const express = require('express');
const path = require('path');

const bodyParser = require('body-parser');

const mongoose = require('mongoose');
const Players = mongoose.model('Players');

const app = express();

app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'pug');

app.use(bodyParser.urlencoded({ extended: true }));


app.get('*', (req, res) => {
    Players.find()
      .then((players) => {
        res.render('players', { title: 'Listing players', players });
      })
      .catch(() => { res.send('Sorry! Something went wrong.'); });
})

module.exports = app