const express = require('express');
const path = require('path');

const bodyParser = require('body-parser');

const mongoose = require('mongoose');
const Registration = mongoose.model('Registration');

const app = express();

app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'pug');

app.use(bodyParser.urlencoded({ extended: true }));


app.get('*', (req, res) => {
    Registration.find()
      .then((registrations) => {
        res.render('index', { title: 'Listing registrations', registrations });
      })
      .catch(() => { res.send('Sorry! Something went wrong.'); });
})

module.exports = app