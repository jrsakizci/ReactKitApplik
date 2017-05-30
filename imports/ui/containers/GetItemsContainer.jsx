import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import GetItems from '../GetItems';
import { createContainer } from 'meteor/react-meteor-data';
import { Content } from '../../../both/collections';
import '../../../both/publications';


export default GetItemsContainer = createContainer((props) => {
    Meteor.subscribe('getSingleItem');
    let items;
    if (props.latitude === 0 && props.longitude === 0) {
      items = Content.find().fetch();
    } else {
      items = Content.find({ loc: { $near: [props.latitude, props.longitude] } }).fetch();
    }
  return {
    itemList: items || false
  };
}, GetItems);
