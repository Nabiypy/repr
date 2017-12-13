/**
 * Created by hanso on 6/14/2017.
 */
'use strict';

var jwt = require('jsonwebtoken');

var config = require('../config'),
  db = require('../models/database'),
  User = require('../models/user');

// The authentication controller.
var AuthController = {};

// Register a user.
AuthController.signUp = function (req, res) {
  console.log("all signup request ~ ",req.body);
  if (!req.body.username || !req.body.password) {
    res.json({ message: 'Please provide a username and a password.' });
  } else {
    db.sync().then(function () {
      var newUser = {
        username: req.body.username,
        password: req.body.password,
        email: req.body.email,
        mobile: req.body.mobile,
        bio: req.body.bio
      };

      return User.create(newUser).then(function () {
        res.status(201)
           .json({
               message: 'Account created successfully!'
           });
      });
    }).catch(function (error) {
      console.log(error);
      res.status(403).json({ message: 'Username already exists!' });
    });
  }
}

// Authenticate a user.
AuthController.authenticateUser = function (req, res) {
  console.log("login request ~ ",req.body);
  if (!req.body.username || !req.body.password) {
    res.status(404)
       .json({ message: 'Username and password are needed!' });
  } else {
    var username = req.body.username,
      password = req.body.password,
      potentialUser = { where: { username: username } };

    User.findOne(potentialUser).then(function (user) {
      if (!user) {
        res.status(404).json({ message: 'Authentication failed!' });
      } else {
        user.comparePasswords(password, function (error, isMatch) {
          if (isMatch && !error) {
            var token = jwt.sign(
              { username: user.username },
              config.keys.secret,
              { expiresIn: '30m' }
            );

            res.json({
              success: true,
              token: 'JWT ' + token,
              user: user.username,
              role: user.role
            });
          } else {
            res.status(404).json({ message: 'Login failed!' });
          }
        });
      }
    }).catch(function (error) {
      res.status(500).json({ message: 'There was an error!' });
    });
  }
}

module.exports = AuthController;
