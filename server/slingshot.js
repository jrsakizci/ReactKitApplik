import { Meteor } from 'meteor/meteor';
import { Slingshot } from 'meteor/edgee:slingshot';

Slingshot.fileRestrictions('profilePic', {
  allowedFileTypes: ['image/png', 'image/jpeg', 'image/gif'],
  maxSize: 1 * 500 * 500 // 10 MB (use null for unlimited).
});
Slingshot.createDirective('profilePic', Slingshot.S3Storage, {
  bucket: 'kitapplik',
  acl: 'public-read',
  region: 'us-west-2',
  AWSAccessKeyId: 'AKIAIGPQTHI63YB4QWMA',
  AWSSecretAccessKey: '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',

  authorize: function () {
    //Deny uploads if user is not logged in.
    if (!this.userId) {
      let message = 'Please login before posting files';
      throw new Meteor.Error('Login Required', message);
    }

    return true;
  },

  key: function (file) {
    //Store file into a directory by the user's username.
    let user = Meteor.users.findOne(this.userId);
    return user.username + '/' + file.name;
  }
});

Slingshot.fileRestrictions('bookPic', {
  allowedFileTypes: ['image/png', 'image/jpeg', 'image/gif'],
  maxSize: 10 * 1024 * 1024 // 10 MB (use null for unlimited).
});
Slingshot.createDirective('bookPic', Slingshot.S3Storage, {
  bucket: 'kitapplik',
  acl: 'public-read',
  region: 'us-west-2',
  AWSAccessKeyId: 'AKIAIGPQTHI63YB4QWMA',
  AWSSecretAccessKey: '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',

  authorize: function () {
    //Deny uploads if user is not logged in.
    if (!this.userId) {
      let message = 'Please login before posting files';
      throw new Meteor.Error('Login Required', message);
    }

    return true;
  },

  key: function (file) {
    //Store file into a directory by the user's username.
    let user = Meteor.users.findOne(this.userId);
    return user.username + '/' + file.name;
  }
});

