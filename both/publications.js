import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

if (Meteor.isServer) {
    Meteor.publish('singleUser', (id) => {
        return Meteor.users.find(_id: id);
    });
}

