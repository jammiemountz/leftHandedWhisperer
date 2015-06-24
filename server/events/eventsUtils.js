var db = require('../db-config');
var Events = require('../collections/events');
var Event = require('../models/event');


module.exports = {

  retrieveAllEvents: function(callback) {
    Events.reset().fetch().then(function(events) {
      events.forEach(function(event) {
        var shortDate = event.attributes.date.toISOString().slice(0,10);
        // console.log(shortDate);
        // var eventsWithUser = found.attributes;
        // eventsWithUser.user = found.relations.user;
        event.set('shortDate',shortDate);
      })
      callback(null,events);
    })
    .catch(function(error) {
      console.log('error:', error);
    });
  },
  retrieveEvent: function(eventID,callback) {
    new Event({ id: eventID }).fetch({withRelated: ['user'], require: true}).then(function(found) {
      if (found) {
        var shortDate = found.date.slice(0,10);
        console.log(shortDate);
        // var eventsWithUser = found.attributes;
        // eventsWithUser.user = found.relations.user;
        found.attributes.shortDate = shortDate;

        callback(null,found.attributes);
      } else {
        console.log('event not found:' + eventName);
      }
    })
    .catch(function(error) {
      console.log('error:', error);
    });
  },
  storeEvent: function(event,callback) {
    console.log("event to add to DB: ", event);

    var name = event.name;
    var description = event.description;
    var venue = event.venue;
    var date = event.date;
    var address = event.address;
    var city = event.city;
    var state = event.state;
    var zip = event.zip;
    var user_id = event.user_id;

    console.log("check");

    new Event({name:name}).fetch().then(function(found) {
      if (found) {
        callback(null,found.attributes);
      } else {

        var event = new Event({name:name,description:description,venue:venue,date:date,address:address,city:city,state:state,zip:zip,user_id:user_id});

        event.save().then(function(newEvent) {
          Events.add(newEvent);
          callback(null,newEvent);
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