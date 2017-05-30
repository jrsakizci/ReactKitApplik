import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import ListItems from '../ListItems';
import { createContainer } from 'meteor/react-meteor-data';
import { Content } from '../../../both/collections';
import '../../../both/publications';

export default SingleItemContainer = createContainer((props) => {
  const subscribe = Meteor.subscribe('getSingleItem', props.routeParams.id);
  return {
    user: Meteor.user() || {},
    getSingleItem: Content.findOne({ _id: props.routeParams.id }) || false,
    getSingleItemIsReady: subscribe.ready()
  };
}, ListItems);
