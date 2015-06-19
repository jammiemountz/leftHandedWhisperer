var db = require('../db-config');
var Users = require('../collections/users');
var User = require('../models/user');


module.exports = {

  retrieveAllUsers: function(callback) {
    Users.reset().fetch().then(function(users) {
      callback(null, users.models)
    })
    .catch(function(error) {
      console.log('error:', error);
    });
  },
  retrieveUser: function(username,callback) {
    new User({ username: username }).fetch({withRelated: ['events'], require: true}).then(function(found) {
      if (found) {
        var userWithEvents = found.attributes;
        userWithEvents.events = found.relations.events;

        callback(null,userWithEvents);
      } else {
        console.log('user not found:' + username);
      }
    })
    .catch(function(error) {
      console.log('error:', error);
    });
  },
  storeUser: function(user,callback) {
    var username = user.username;
    var password = user.password;
    var city = user.city;

    new User({username:username}).fetch().then(function(found) {

      if (found) {
        callback(null, found.attributes);
        console.log('user already found:', username);

      } else {

        var user = new User({username:username,password:password,city:city});

        user.save().then(function(newUser) {
          Users.add(newUser);
          callback(null, newUser);
        })
        .catch(function(error) {
          console.log('error:', error);
        });
      }
    })
    .catch(function(error) {
      console.log('error:', error);
    });
  }

};