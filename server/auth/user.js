import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';

if (Meteor.isServer) {
    Accounts.onCreateUser((options, user) => {
        Meteor.setTimeout(function () {
            Accounts.sendVerificationEmail(user._id);
        }, 2 * 1000);
        return user;
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
        changeUsername: (uname) => {
            try {
                Accounts.setUsername(Meteor.userId(), uname);
            }
            catch (err) {
                throw err;
            }
        },
        changeEmail: (newEmail) => {
            try {
                const user = Meteor.users.findOne(Meteor.userId());
                if (user) {
                    Accounts.removeEmail(Meteor.userId(), user.emails[0].address);
                }
                Accounts.addEmail(Meteor.userId(), newEmail, false);
            }
            catch (err) {
                throw err;
            }
        },
    });
}
