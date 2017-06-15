import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { Content } from '../both/collections';

if (Meteor.isServer) {
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
        },
        approveContent: (id) => {
            try {
                return Content.update(id, { $set: { isVisible: 1 } });
            } catch (err) {
                throw err;
            }
        },
        removeContent: (id) => {
            try {
                return Content.remove(id);
            } catch (err) {
                throw err;
            }
        },
        getContentByCat: (catid, page, limit, lat, long) => {
            try {
                page = +page;
                limit = +limit;
                const skip = (page - 1) * limit;
                return Content.find(
                    { isVisible: 1, 
                        content_cats: { $elemMatch: { id: catid } }, 
                        loc: { 
                            $near: {
                                $geometry: {
                                    type: 'Point',
                                    coordinates: [long, lat],
                                    index: '2dsphere'
                                }
                            }
                        } 
                    }, 
            { skip, limit }).fetch();
            } catch (err) {
                throw err;
            }
        }
    });
}
