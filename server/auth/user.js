import { Meteor } from 'meteor/meteor';
import { Accounts } from "meteor/accounts-base";


if (Meteor.isServer) {
    Meteor.methods({
        newUser: (uname, emailn, passwordn) => {
            try {
                const user = Meteor.users.findOne({ email: emailn });
                if (!user) {
                    const createdUser = Accounts.createUser({
                        username: uname,
                        password: passwordn,
                        email: emailn,
                        createdAt: new Date()
                    }, () => {
                        console.log('callback');
                    });
                console.log(createdUser);
                }    
            }
            catch (err) {
                return err;
            }
        }
    });
}
