import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { browserHistory, Link } from 'react-router';
import NotificationSystem from 'react-notification-system';
import Loader from '../Loader';
import ReactModal from 'react-modal';
import '../../stylesheets/messages.less';

export default class NewMessage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedUser: [],
            username: '',
            userList: [],
            message: '',
        };
        this.handleUsernameChange = this.handleUsernameChange.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.sendMessage = this.sendMessage.bind(this);
    }
    componentWillMount() {
        this.messageInfos = {
            username: '',
            userList: []
        };
    }
    handleUsernameChange(event) {
        if (this.state.selectedUser.username) {
            this.setState({
                selectedUser: []
            });
        }
        const value = event.target.value;
        const name = event.target.name;
        this.setState({
            [name]: value
        }, () => {
            if (this.state.username === '') {
                this.messageInfos.userList = [];
                this.renderUserList();
                return;
            } else {
                Meteor.call('getUserSuggestions', this.state.username, (err, resp) => {
                    this.messageInfos.userList = resp;
                });
            }
        });
    }
    handleInputChange(event) {
        const value = event.target.value;
        const name = event.target.name;
        this.setState({
            [name]: value
        });
    }
    selectUser(user) {
        this.setState({
            selectedUser: user,
            username: '',
        });
        this.messageInfos.userList = [];
    }
    sendMessage(event) {
        event.preventDefault();
        console.log(this.state.selectedUser);
    }
    renderUserList() {
        return this.messageInfos.userList.map((item) =>
            <li key={item._id} onClick={() => this.selectUser(item)}>{item.username}</li>
        );
    }
    render() {
        return (
            <div>
                <form onSubmit={this.sendMessage}>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        placeholder="Kullanıcı Adı"
                        onChange={this.handleUsernameChange}
                        value={this.state.selectedUser.username}
                        required
                    />
                    <div id='user-suggestions' className={this.state.username !== '' ? 'showSuggestion' : 'hideSuggestion'}>
                        <ul>
                            {(this.messageInfos.userList.length > 0) ? this.renderUserList() : ''}
                        </ul>
                    </div>
                    <textarea
                        rows="10"
                        placeholder="Mesaj İçeriği / 500 Karakter."
                        id="message"
                        className="message"
                        name="message"
                        maxLength="500"
                        onChange={this.handleInputChange}
                        required
                    />
                    <input
                        type="submit"
                        className="message-sbmt"
                        value="Gönder"
                    />
                </form>
            </div>
        );
    }
}
