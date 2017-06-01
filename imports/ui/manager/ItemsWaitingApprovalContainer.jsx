import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import GetItemsWaitingApproval from './GetItemsWaitingApproval';
import { createContainer } from 'meteor/react-meteor-data';
import { Content } from '../../../both/collections';

const initPage = 1;
let nextPage = initPage;

export default ItemsWaitingApprovalContainer = createContainer((props) => {
    const limit = 2;
    const itemsHandle = Meteor.subscribe('front.items.waitingapproval', initPage, limit);
  return {
      itemList: Content.find({ isVisible: 0 }).fetch(),
      itemSub: itemsHandle.ready(),
      loadMore() {
          const itemsHandle = Meteor.subscribe('front.items.waitingapproval', ++nextPage, limit);
      }
  };
}, GetItemsWaitingApproval);
