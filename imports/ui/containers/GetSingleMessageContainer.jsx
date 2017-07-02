import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { Messages } from '../../../both/collections';
import { createContainer } from 'meteor/react-meteor-data';
import SingleMessage from '../messaging/SingleMessage';

export default GetSingleMessageContainer = createContainer((props) => {
    const subscribe = Meteor.subscribe('getSingleConversation', props.id);
  return {
    user: Meteor.user() || {},
    getConversation: Messages.find({ _id: props.id }).fetch() || false,
    getSingleItemIsReady: subscribe.ready()
  };
}, SingleMessage);
