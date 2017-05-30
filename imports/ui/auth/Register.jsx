import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { browserHistory } from 'react-router';
import '../../stylesheets/register.less';
import NotificationSystem from 'react-notification-system';
import Loader from '../Loader';

export default class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: 'kullanıcı adı',
            email: 'email',
            password: 'şifre',
            loader: false
        };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.submit = this.submit.bind(this);
    }
    componentWillMount() {
        this.placeholder = {
            username: 'kullanıcı adı',
            email: 'email',
            password: 'şifre'
        };
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
        this.setState({
            loader: true
        });
        Meteor.call('newUser',
            this.state.username,
            this.state.email,
            this.state.password,
            (error) => {
                if (error) {
                    this.setState({
                        loader: false
                    });
                    this._notificationSystem.addNotification({
                        message: 'Kayıt olurken bir hata oluştu!',
                        level: 'error'
                    });
                } else {

                    this.setState({
                        loader: false
                    });
                    this._notificationSystem.addNotification({
                        message: 'Başarıyla kaydoldunuz. Yönlendirileceksiniz.',
                        level: 'success'
                    });
                    this._notificationSystem.addNotification({
                        message: 'Lütfen email adresinizi kontrol edip üyeliğinizi onaylayın.',
                        level: 'warning'
                    });
                    setTimeout(() => {
                        browserHistory.push('/giris-yap');
                    }, 3500);
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
                        placeholder={this.placeholder.username}
                        id="username"
                        name="username"
                        required
                        onChange={this.handleInputChange}
                    />
                    <input
                        type="email"
                        placeholder={this.placeholder.email}
                        id="email"
                        name="email"
                        required
                        onChange={this.handleInputChange}
                    />
                    <input
                        type="password"
                        placeholder={this.placeholder.password}
                        id="password"
                        name="password"
                        required
                        onChange={this.handleInputChange}
                    />
                    <input
                        type="submit"
                        className="login-sbmt"
                        value="Hesap Oluştur"
                    />
                </form>
                <NotificationSystem ref="notificationSystem" />
                {this.renderLoader()}
            </div>
        );
    }
}
