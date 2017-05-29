import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { browserHistory } from 'react-router';
import NotificationSystem from 'react-notification-system';

export default class GetItems extends Component {
  constructor(props) {
    super(props);
    this.state = {
      latitude: 0,
      longitude: 0
    };
  }
  componentWillMount() {

  }
  render() {
    return (
        <div id="homeItems">
            <span>Items</span>
        </div>
    );
  }
}
