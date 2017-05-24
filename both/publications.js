import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

if (Meteor.isServer) {
    Meteor.publish('getSingleUser', (id) => {
        return Meteor.users.find({ _id: id }, { fields: { 'username': 1, 'profile.profilePic': 1 } });
    });
}

