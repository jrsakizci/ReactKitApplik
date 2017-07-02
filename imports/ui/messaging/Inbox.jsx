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
import GetSingleMessageContainer from '../containers/GetSingleMessageContainer';
import Moment from 'react-moment';

export default class Inbox extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showSingle: false,
            singleId: 0
        };
        this.openMessage = this.openMessage.bind(this);
    }
    openMessage(id) {
        this.setState({
            showSingle: true,
            singleId: id
        });
    }
    renderConversations() {
        if (this.props.getConversations.length > 0) {
            return this.props.getConversations.map((item) =>
                <div className='message-container' key={item._id} onClick={() => this.openMessage(item._id) }>
                    <GetMessageUserInfoContainer id={item.members[0]} />
                    <div className='message-date'><Moment fromNow ago>{item.conversation[item.conversation.length - 1].date}</Moment></div>
                    <div className='message'>{item.conversation[item.conversation.length - 1].message}</div>
                 </div>    
        )};
    }
    render() {
        return (
            <div>
                <div className={this.state.showSingle ? 'hide' : 'show'}>
                    {this.renderConversations()}
                </div>
                <div className={this.state.showSingle ? 'show' : 'hide'}>
                    <GetSingleMessageContainer id={this.state.singleId} />
                </div>
            </div>
        );
    }
}
