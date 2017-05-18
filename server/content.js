import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { Mongo } from 'meteor/mongo';

const Content = new Mongo.Collection('content');

if (Meteor.isServer) {
    Meteor.methods({
       addNewContent: (name, descr, categories, longi, lati, picsUrl) => {
           try {
                Content.insert({
                    content_name: name,
                    content_desc: descr,
                    content_cats: categories,
                    long: longi,
                    lat: lati,
                    picUrl: picsUrl,
                    isVisible: 0,
                    user: Meteor.userId()
                });
           }
           catch (err) {
               throw err;
           }
       }
    });
}
