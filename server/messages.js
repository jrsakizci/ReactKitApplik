import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { Messages } from '../both/collections';

if (Meteor.isServer) {
    Meteor.methods({
        sendNewMessage: (senderID, receiverID, dateTime, messageBody) => {
            try {
                const searchConv = Messages.findOne({ members: [senderID, receiverID] });
                if (searchConv) {
                    return Messages.update({ _id: searchConv._id },
                        {
                            $push:
                            {
                                conversation: {
                                    sender: senderID,
                                    message: messageBody,
                                    date: dateTime,
                                    isRead: false
                                }
                            }
                        });
                }
                return Messages.insert({
                    members: [
                        senderID,
                        receiverID
                    ],
                    conversation: [
                        {
                            sender: senderID,
                            message: messageBody,
                            date: dateTime,
                            isRead: false
                        }
                    ]
                });
            } catch (err) {
                throw err;
            }
        }
    });
}
