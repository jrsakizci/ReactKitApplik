import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { browserHistory, Link } from 'react-router';
import NotificationSystem from 'react-notification-system';
import Loader from '../Loader';
import ReactModal from 'react-modal';

export default class Messages extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loader: true,
            showModal: false
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
    render() {
        return (
            <div>
                <i className="fa fa-comment-o" onClick={this.handleOpenModal} />
                <div className="messageNotificationNumber">1</div>
                <ReactModal
                    isOpen={this.state.showModal}
                    contentLabel="Minimal Modal Example"
                >
                    <button onClick={this.handleCloseModal}>Close Modal</button>
                </ReactModal>
            </div>
        );
    }
}
