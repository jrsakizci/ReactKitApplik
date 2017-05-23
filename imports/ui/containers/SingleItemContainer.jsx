import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import ListItems from '../ListItems';
import { createContainer } from 'meteor/react-meteor-data';
import { Content } from '../../../both/collections';
import '../../../both/publications';

export default SingleItemContainer = createContainer((props) => {
  Meteor.subscribe('getSingleItem');

  const singleItem = Content.find({ _id: props.routeParams.id }).fetch();
  const userInfo = Meteor.users.findOne({ _id: props.id });
  console.log(userInfo);
  return {
    user: Meteor.user() || {},
    getSingleItem: singleItem || false
  };
}, ListItems);
