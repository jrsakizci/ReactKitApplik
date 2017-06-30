import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { browserHistory, Link } from 'react-router';
import NotificationSystem from 'react-notification-system';
import Loader from '../Loader';
import ReactModal from 'react-modal';
import '../../stylesheets/messages.less';
import NewMessageContainer from '../containers/NewMessageContainer';
import InboxContainer from '../containers/MessageInboxContainer';

export default class Messages extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
           <div>inboxxxx</div>
        );
    }
}
