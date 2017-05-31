import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { browserHistory } from 'react-router';
import Loader from '../Loader';
import NotificationSystem from 'react-notification-system';
import { Accounts } from 'meteor/accounts-base'

export default class VerifyEmail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            loader: false

        };
        this.submit = this.submit.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    componentDidMount() {
        this._notificationSystem = this.refs.notificationSystem;
    }
    handleInputChange(event) {
        const value = event.target.value;
        const name = event.target.name;

        this.setState({
            [name]: value
        });
    }
    submit(event) {
        event.preventDefault();
        const options = {};
        options.email = this.state.email;
        const errors = {
            403: 'Öyle bir kullanıcı yok. Email adresinizi yanlış girdiniz.'
        };
        this.setState({
            loader: true
        });
        Accounts.forgotPassword(options, (err) => {
            if (err) {
                this._notificationSystem.addNotification({
                    level: 'error',
                    message: errors[err.error] ? errors[err.error] : 'Bir hata meydana geldi.'
                });
                this.setState({
                    loader: false
                });
            } else {
                this._notificationSystem.addNotification({
                    level: 'success',
                    message: 'Link e-mail adresinize gönderildi'
                });
                this.setState({
                    loader: false
                });
            }
        });
    }
    renderLoader() {
        return <Loader show={this.state.loader} />;
    }
    render() {
        return (
            <div id="login">
                <form onSubmit={this.submit}>
                    <input
                        type="text"
                        placeholder='email adresiniz'
                        id="email"
                        name="email"
                        required
                        onChange={this.handleInputChange}
                    />
                    <input
                        type="submit"
                        className="login-sbmt"
                        value="Şifremi Sıfırla"
                    />
                </form>
                <NotificationSystem ref="notificationSystem" />
                {this.renderLoader()}
            </div>
        );
    }
}
