import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import Routes from '../Routes';
import { createContainer } from 'meteor/react-meteor-data';



export default AuthContainer = createContainer((props) => {
   Meteor.subscribe('currentUser', {
        onReady: () => { console.log('ready'); }
    });
  return {
    user: Meteor.user() || {}
  };
}, Routes);
