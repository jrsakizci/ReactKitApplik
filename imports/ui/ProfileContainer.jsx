import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import Profile from './Profile';
import { createContainer } from 'meteor/react-meteor-data';



export default ProfileContainer = createContainer((props) => {
  return {
    user: Meteor.user() || {}
  };
}, Profile);
