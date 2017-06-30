import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import Messages from '../messaging/Messages';

export default MessagesContainer = createContainer((props) => {
  return {
     user: Meteor.user() || {}
  };
}, Messages);
