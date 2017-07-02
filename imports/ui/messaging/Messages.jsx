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
        this.state = {
            loader: true,
            showModal: false,
            newMessage: false,
        };
        this.handleOpenModal = this.handleOpenModal.bind(this);
        this.handleCloseModal = this.handleCloseModal.bind(this);
    }
    componentDidMount() {
        this.setState({
            loader: false
        });
    }
    handleOpenModal() {
        this.setState({
            showModal: true
        });
    }
    handleCloseModal() {
        this.setState({
            showModal: false
        });
    }
    toggleNewMessage() {
        this.setState({ newMessage: !this.state.newMessage });
    }
    render() {
        return (
            <div className='messages-container'>
                <div onClick={this.handleOpenModal}>
                    <i className="fa fa-comment-o" />
                    <div className="messageNotificationNumber">1</div>
                </div>
                <ReactModal
                    isOpen={this.state.showModal}
                    contentLabel="Mesajlar">

                    <button onClick={this.handleCloseModal} className='messages-close-button'><i className="fa fa-times" aria-hidden="true" /></button>
                    <h2 className='messages-conversations-heading'><i className="fa fa-envelope-open-o" aria-hidden="true" /> Mesajlar</h2>
                    <button onClick={this.toggleNewMessage.bind(this)} id='messages-new-message' className={this.state.newMessage ? '' : 'newMessageActive'}><i className="fa fa-commenting-o" aria-hidden="true" /> Yeni Mesaj Gönder</button>
                    <div id='inbox-container' className={this.state.newMessage ? 'show' : 'hide'}>
                       <InboxContainer id={this.props.user._id} />
                    </div>
                    <div id='new-message-container' className={this.state.newMessage ? 'hide' : 'show'}>
                        <div className='new-message-back' onClick={this.toggleNewMessage.bind(this)}> <i className="fa fa-angle-double-left" aria-hidden="true" /> Gelen Mesajlar</div>
                        <NewMessageContainer />
                    </div>
                </ReactModal>
            </div>
        );
    }
}
