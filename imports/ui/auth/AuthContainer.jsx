import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import Routes from '../Routes';
import { createContainer } from 'meteor/react-meteor-data';

export default AuthContainer = createContainer((props) => {
  return {
    user: Meteor.user() || {}
  };
}, Routes);
