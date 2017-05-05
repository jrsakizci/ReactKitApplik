import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';

import NotificationSystem from 'react-notification-system';
import createHistory from 'history/createBrowserHistory';

export const history = createHistory();

export default class Login extends Component {
    constructor(props) {
        super(props);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.submit = this.submit.bind(this);
    }
    componentWillMount() {
        this.placeholder = {
            username: 'kullanıcı adı',
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
        Meteor.loginWithPassword(this.state.username, this.state.password,
            (error) => {
                if (error) {
                    this._notificationSystem.addNotification({
                        level: 'error',
                        message: 'Yanlış kullanıcı adı veya şifre girdiniz.'
                    });
                }
                else {
                    this._notificationSystem.addNotification({
                        level: 'success',
                        message: 'Başarıyla giriş yaptınız, yönlendiriliyorsunuz..'
                    });
                       history.push('/');
                       history.go(-1);
                }
            });
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
                        value="Giriş Yap"
                    />
                </form>
                 <Link to="/register"><div className="register-text">Bir hesabın yok mu? <span className="register-link">Hesap Oluştur!</span></div></Link>
                <NotificationSystem ref="notificationSystem" />
            </div>
        )
    }
}
