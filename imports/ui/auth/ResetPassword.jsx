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
            loader: false,
            password: '',
            password2: ''
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
        const errors = {
            403: 'Linkin süresi dolmuş. Yönlendiriliyorsunuz.'
        };
        if (this.state.password !== this.state.password2) {
            this._notificationSystem.addNotification({
                    message: 'Şifreleriniz birbiriyle uyuşmuyor. Lütfen yeniden deneyiniz.',
                    level: 'error'
                });
                return;
        }
        this.setState({
            loader: true
        });
        Accounts.resetPassword(this.props.params.id, this.state.password, (err) => {
            if (err) {
                this._notificationSystem.addNotification({
                    message: errors[err.error] ? errors[err.error] : 'Bir hata meydana geldi.',
                    level: 'error'
                });
                this.setState({
                    loader: false
                });
                setTimeout(() => {
                    browserHistory.push('/sifremi-unuttum');
                }, 1100);
            } else {
                 this._notificationSystem.addNotification({
                    message: 'Şifreniz başarıyla değiştirilmiştir.',
                    level: 'success'
                });
                this.setState({
                    loader: false
                });
                setTimeout(() => {
                    browserHistory.push('/');
                }, 1100);
            }
        });
    }
    renderLoader() {
        return <Loader show={this.state.loader} />
    }
    render() {
        return (
            <div id="login">
                <form onSubmit={this.submit}>
                    <input
                        type="password"
                        placeholder='yeni şifreniz'
                        id="password"
                        name="password"
                        required
                        onChange={this.handleInputChange}
                    />
                     <input
                        type="password"
                        placeholder='yeni şifreniz tekrar'
                        id="password2"
                        name="password2"
                        required
                        onChange={this.handleInputChange}
                    />
                    <input
                        type="submit"
                        className="login-sbmt"
                        value="Şifremi Değiştir"
                    />
                </form>
                <NotificationSystem ref="notificationSystem" />
                {this.renderLoader()}
            </div>
        );
    }
}
