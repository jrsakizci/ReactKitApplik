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
            loader: false
        };
    }
    componentDidMount() {
        this._notificationSystem = this.refs.notificationSystem;
        this.setState({
            loader: true
        });
        const errors = {
            403: 'Linkin süresi dolmuş. Yönlendiriliyorsunuz.'
        };
        Accounts.verifyEmail(this.props.params.id, (err) => {
            if (err) {
                this._notificationSystem.addNotification({
                    message: errors[err.error],
                    level: 'error'
                });
                this.setState({
                    loader: false
                });
                setTimeout(() => {
                    browserHistory.push('/giris-yap');
                }, 2000);
            } else {
                 this._notificationSystem.addNotification({
                    message: 'Email adresiniz onaylandı! Artık içerik ekleyebilirsiniz.',
                    level: 'success'
                });
                 this.setState({
                    loader: false
                });
                setTimeout(() => {
                    browserHistory.push('/giris-yap');
                }, 1000);
            }
        });
    }
    renderLoader() {
        return <Loader show={this.state.loader} />
    }
    render() {
        return (
            <div>
                <span></span>
                <NotificationSystem ref="notificationSystem" />
                {this.renderLoader()}
            </div>
        );
    }
}
