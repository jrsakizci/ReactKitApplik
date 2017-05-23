import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

if (Meteor.isServer) {
    Meteor.publish('singleUser', () => {
        return Meteor.users.findOne();
    });
}

