import { Meteor } from 'meteor/meteor';
import { Slingshot } from 'meteor/edgee:slingshot';

Slingshot.fileRestrictions("myFileUploads", {
  allowedFileTypes: ["image/png", "image/jpeg", "image/gif"],
  maxSize: 10 * 1024 * 1024 // 10 MB (use null for unlimited).
});

Slingshot.createDirective("myFileUploads", Slingshot.S3Storage, {
  bucket: "kitapplik",
  acl: "public-read",
  region: "us-west-2",
  AWSAccessKeyId: "AKIAIGPQTHI63YB4QWMA",
  AWSSecretAccessKey: "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",

  authorize: function () {
    //Deny uploads if user is not logged in.
    if (!this.userId) {
      var message = "Please login before posting files";
      throw new Meteor.Error("Login Required", message);
    }

    return true;
  },

  key: function (file) {
    //Store file into a directory by the user's username.
    var user = Meteor.users.findOne(this.userId);
    return user.username + "/" + file.name;
  }
});