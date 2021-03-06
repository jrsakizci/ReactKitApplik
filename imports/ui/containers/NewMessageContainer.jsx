import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import NewMessage from '../messaging/NewMessage';

export default NewMessageContainer = createContainer((props) => {
  return {
     user: Meteor.user() || {}
  };
}, NewMessage);
