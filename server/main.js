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
    Accounts.emailTemplates.from = 'admin@kitapplik.com';

    //-- Application name
    Accounts.emailTemplates.siteName = 'KitApplik';

    //-- Subject line of the email.
    Accounts.emailTemplates.verifyEmail.subject = (user) => {
        return 'Lütfen Email Adresinizi Doğrulayın.';
    };
    Accounts.emailTemplates.resetPassword.subject = () => {
        return 'Şifre Sıfırlama E-maili';
    };
    Accounts.emailTemplates.resetPassword.text = (user, url) => {
        const newUrl = url.replace('/#','');
        return 'Merhaba ' + user.username + ', \r\n Şifrenizi sıfırlamanız için aşağıdaki linke tıklayabilirsiniz: \r\n' + newUrl;
    };
    //-- Email text
    Accounts.emailTemplates.verifyEmail.text = (user, url) => {
        const newUrl = url.replace('/#','');
        return 'Kayıt olduğunuz için teşekkürler! Aramıza hoş geldiniz. Lütfen bu linke tıklayarak email adresinizi doğrulayın: \r\n' + newUrl;
    };
});
