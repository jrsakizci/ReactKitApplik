import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import './slingshot';

Meteor.startup(() => {
  // code to run on server at startup
    var username = 'bgrbey@gmail.com';
    var password = 'Bugra.98036??';
    var server = 'smtp.gmail.com';
    var port = '465';

    process.env.MAIL_URL = 'smtp://' +
        encodeURIComponent(username) + ':' +
        encodeURIComponent(password) + '@' +
        encodeURIComponent(server) + ':' + port;

    // 2. Format the email
    //-- Set the from address
    Accounts.emailTemplates.from = 'test@test.com';

    //-- Application name
    Accounts.emailTemplates.siteName = 'My_App';

    //-- Subject line of the email.
    Accounts.emailTemplates.verifyEmail.subject = function(user) {
        return 'Confirm Your Email Address for My_App';
    };

    //-- Email text
    Accounts.emailTemplates.verifyEmail.text = function(user, url) {
        var newUrl = url.replace('/#','');
        return 'Thank you for registering.  Please click on the following link to verify your email address: \r\n' + newUrl;
    };
});
