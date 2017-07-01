import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { Messages } from '../../../both/collections';
import { createContainer } from 'meteor/react-meteor-data';
import Inbox from '../messaging/Inbox';

export default InboxContainer = createContainer((props) => {
    const subscribe = Meteor.subscribe('getUserConversations', props.id);
  return {
    user: Meteor.user() || {},
    getConversations: Messages.find({ members: props.id }).fetch() || false,
    getSingleItemIsReady: subscribe.ready()
  };
}, Inbox);
