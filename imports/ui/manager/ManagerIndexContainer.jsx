import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import ManagerIndex from './ManagerIndex';
import { createContainer } from 'meteor/react-meteor-data';

export default ManagerIndexContainer = createContainer((props) => {
    const userRoleSub = Meteor.subscribe('getSingleUserRole', Meteor.userId());
    const query = Meteor.users.findOne({ _id: Meteor.userId(), role: 'admin' });

  return {
      user: query || false,
  };
}, ManagerIndex);
