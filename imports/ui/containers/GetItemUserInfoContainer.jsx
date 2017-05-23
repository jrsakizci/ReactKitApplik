import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import GetItemUserInfo from '../GetItemUserInfo';
import { createContainer } from 'meteor/react-meteor-data';
import '../../../both/publications';

export default GetItemUserInfoContainer = createContainer((props) => {
  Meteor.subscribe('getSingleUser');

  const userInfo = Meteor.users.findOne({ _id: props.id });

  return {
    user: Meteor.user() || {},
    itemUserInfo: userInfo || false
  };
}, GetItemUserInfo);
