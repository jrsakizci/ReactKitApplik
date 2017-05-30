import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { Content } from '../both/collections';

if (Meteor.isServer) {
    Meteor.publish('getSingleItem', (id) => {
        return Content.find({ _id: id });
    });
    Meteor.methods({
       addNewContent: (name, descr, categories, longi, lati, picsUrl, dateTime) => {
           try {
               return Content.insert({
                    content_name: name,
                    content_desc: descr,
                    content_cats: categories,
                    loc: {
                        x: longi,
                        y: lati
                    },
                    picUrl: picsUrl,
                    isVisible: 0,
                    user: Meteor.userId(),
                    date: dateTime
                });
           } catch (err) {
               throw err;
           }
       }
    });
}
