const express = require('express');
const mongoose = require('mongoose');
const { body, validationResult } = require('express-validator/check');

const path = require('path');
const auth = require('http-auth');
const basic = auth.basic({
    file: path.join(__dirname, '../users.htpasswd'),
  });
  

const router = express.Router();
const Registration = mongoose.model('Registration');
const Players = mongoose.model('Players');

router.get('/', (req, res) => {
    res.render('form', { title: 'Index' });
});

router.get('/register', (req, res) => {
    res.render('form', { title: 'Registration form' });
});

router.get('/dataentry', (req, res) => {
    res.render('dataentry', { title: 'Add Data' });
});

router.get('/registrations', auth.connect(basic), (req, res) => {
    Registration.find()
      .then((registrations) => {
        res.render('index', { title: 'Listing registrations', registrations });
      })
      .catch(() => { res.send('Sorry! Something went wrong.'); });
  });

  router.get('/players', (req, res) => {
    Players.find()
      .then((players) => {
        res.render('players', { title: 'Listing players', players });
      })
      .catch(() => { res.send('Sorry! Something went wrong.'); });
  });

  router.get('/view', (req, res) => {
      res.render('standard', { title: 'Test View' });
  });
/*
router.post('/',
    [
        body('name')
            .isLength({ min: 1 })
            .withMessage('Please enter a name'),
        body('email')
            .isLength({ min: 1 })
            .withMessage('Please enter an email'),
    ],
    (req, res) => {
        console.log(req.body);
        const errors = validationResult(req);

        if (errors.isEmpty()) {
            const registration = new Registration(req.body);
            registration.save()
              .then(() => { res.send('Thank you for your registration!'); })
              .catch(() => { res.send('Sorry! Something went wrong.'); });
        } else {
            res.render('form', {
                title: 'Registration form',
                errors: errors.array(),
                data: req.body,
            });
        }
    }
);*/

router.post('/',
    [
        body('firstname')
            .isLength({ min: 1 })
            .withMessage('Please enter a first name'),
        body('lastname')
            .isLength({ min: 1 })
            .withMessage('Please enter a last name'),
        body('team')
            .isLength({ min: 1 })
            .withMessage('Please enter a team'),
        body('position')
            .isLength({ min: 1 })
            .withMessage('Please enter a position'),
    ],
    (req, res) => {
        console.log(req.body);
        const errors = validationResult(req);

        if (errors.isEmpty()) {
            const players = new Players(req.body);
            players.save()
              .then(() => { res.send('Thank you for your registration!'); })
              .catch(() => { res.send('Sorry! Something went wrong.'); });
        } else {
            res.render('dataentry', {
                title: 'Players',
                errors: errors.array(),
                data: req.body,
            });
        }
    }
);

module.exports = router;