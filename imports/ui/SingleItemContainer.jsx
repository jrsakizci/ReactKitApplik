import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import ListItems from './ListItems';
import { createContainer } from 'meteor/react-meteor-data';
import { Content } from '../../both/collections';

export default SingleItemContainer = createContainer((props) => {
  Meteor.subscribe('getSingleItem');

  const singleItem = Content.find({ _id: props.routeParams.id }).fetch();
    console.log(singleItem);
  return {
    user: Meteor.user() || {},
    getSingleItem: singleItem || false
  };
}, ListItems);
