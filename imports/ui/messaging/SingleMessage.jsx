import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { browserHistory, Link } from 'react-router';
import NotificationSystem from 'react-notification-system';
import Loader from '../Loader';
import ReactModal from 'react-modal';
import '../../stylesheets/single-message.less';
import '../../stylesheets/messages.less';
import Moment from 'react-moment';

export default class Messages extends Component {
    constructor(props) {
        super(props);
    }
    renderConversation() {
        if (this.props.getConversation.length > 0) {
            return this.props.getConversation[0].conversation.map((item) =>
                <div className='message-container' key={item._id}>
                    <div className='message-date'><Moment fromNow ago>{item.date}</Moment></div>
                    <div className='message'>{item.message}</div>
                </div>
            )
        };
    }
    render() {
        return (
            <div>
                {this.renderConversation()}
            </div>
        );
    }
}
