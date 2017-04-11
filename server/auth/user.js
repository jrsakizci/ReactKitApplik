import { Meteor } from 'meteor/meteor';

Meteor.methods({
    'newUser': function (username, email, password) {
        console.log("register happening");
    }
});