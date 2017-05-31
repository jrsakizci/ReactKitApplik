import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import NewItem from '../NewItem';
import { createContainer } from 'meteor/react-meteor-data';

export default NewItemContainer = createContainer((props) => {
  return {
    user: Meteor.user() || {},
  };
}, NewItem);
