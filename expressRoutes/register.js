const express = require('express');
const path = require('path');

const bodyParser = require('body-parser');

const app = express();

app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'pug');

app.use(bodyParser.urlencoded({ extended: true }));


app.get('*', (req, res) => {
    res.render('form', { title: 'Registration form' });
})

module.exports = app