import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import MessageUserInfo from '../messaging/MessageUserInfo';
import { createContainer } from 'meteor/react-meteor-data';
import '../../../both/publications';

export default GetMessageUserInfoContainer = createContainer((props) => {
  Meteor.subscribe('getSingleUser', props.id);

  const userInfo = Meteor.users.findOne({ _id: props.id });

  return {
    user: Meteor.user() || {},
    userInf: userInfo || false
  };
}, MessageUserInfo);
