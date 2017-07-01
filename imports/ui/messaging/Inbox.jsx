import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { browserHistory, Link } from 'react-router';
import NotificationSystem from 'react-notification-system';
import Loader from '../Loader';
import ReactModal from 'react-modal';
import '../../stylesheets/messages.less';
import NewMessageContainer from '../containers/NewMessageContainer';
import InboxContainer from '../containers/MessageInboxContainer';
import GetMessageUserInfoContainer from '../containers/GetMessageUserInfoContainer';

export default class Messages extends Component {
    constructor(props) {
        super(props);
    }
    renderConversations() {
        if (this.props.getConversations.length > 0) {
            return this.props.getConversations.map((item) =>
                <div key={item._id}>
                    <GetMessageUserInfoContainer id={item.members[0]} />
                    <div>{item.conversation[item.conversation.length - 1].message} - {item.conversation[item.conversation.length - 1].date}</div>
                 </div>    
        )};
    }
    render() {
        return (
            <div>
                {this.renderConversations()}
            </div>
        );
    }
}
