import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { Content } from '../both/collections';

if (Meteor.isServer) {
    Meteor.publish('getSingleUser', (id) => {
        return Meteor.users.find({ _id: id }, { fields: { 'username': 1, 'profile.profilePic': 1 } });
    });
    Meteor.publish('getSingleUserRole', (id) => {
        return Meteor.users.find({ _id: id });
    });
    Meteor.publish('contentsWaitingApproval', () => {
        return Content.find({ isVisible: 0 }).count();
    });
    Meteor.publish('getSingleItem', (id) => {
        return Content.find({ _id: id });
    });
    Meteor.publish('front.items.waitingapproval', (page, limit) => {
    page = +page;
    limit = +limit;

    const skip = (page - 1) * limit;

    return Content.find({ isVisible: 0 }, { skip, limit });
});
}

