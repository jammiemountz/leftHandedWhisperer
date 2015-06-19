var db = require('../db-config');
var Users = require('../collections/users');
var User = require('../models/user');


module.exports = {

  retrieveAllUsers: function(callback) {
    console.log('retrieving users in utils')
    Users.reset().fetch().then(function(users) {
      console.log('fetched users: ',users.models )
      callback(users); //do we need callback
    })
    .catch(function(error) {
      console.log(error);
    });
  },
  retrieveUser: function(username) {
    new User({ username: username }).fetch().then(function(found) {
      if (found) {
        return found.attributes;
      } else {
        console.log('user not found:' + username);
      }
    });
  },
  addUser: function(user) {
    console.log("user to add to DB: ", user);

    new User({username:username}).fetch().then(function(found) {
      if (found) {
        return found.attributes;
      } else {

        var user = new User(user);

        user.save().then(function(newUser) {
          Users.add(newUser);
          return newUser;
        });
      }
    });
  }

};