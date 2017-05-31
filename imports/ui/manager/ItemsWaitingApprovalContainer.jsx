import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import GetItemsWaitingApproval from './GetItemsWaitingApproval';
import { createContainer } from 'meteor/react-meteor-data';
import { Content } from '../../../both/collections';

export default ItemsWaitingApprovalContainer = createContainer((props) => {
    const itemsSub = Meteor.subscribe('contentsWaitingApproval');
    const items = Content.find({ isVisible: 0 });
  return {
      itemList: items || false,
      itemSub: itemsSub.ready()
  };
}, GetItemsWaitingApproval);
