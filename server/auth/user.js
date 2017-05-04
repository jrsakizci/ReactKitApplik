import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';


if (Meteor.isServer) {
     Meteor.publish('currentUser', () => {
         const user = Meteor.users.findOne(this.userId);
            if (user) {
               return user;
            }
            return {};
    });
    Meteor.methods({
        newUser: (uname, emailn, passwordn) => {
            try {
                const findRegisteredUser = Meteor.users.findOne({ email: emailn });
                if (!findRegisteredUser) {
                   Accounts.createUser({
                        username: uname,
                        password: passwordn,
                        email: emailn,
                        createdAt: new Date()
                    });
                }
            }
            catch (err) {
               throw err;
            }
        },
    });
}
