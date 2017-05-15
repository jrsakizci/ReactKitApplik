import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { browserHistory } from 'react-router';
import '../stylesheets/profile.less';
import NotificationSystem from 'react-notification-system';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';


export default class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: 'kullanıcı adı',
            email: 'email',
            oldPassword: 'eski şifre',
            newPassword: 'yeni şifre'
        };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.changeUsername = this.changeUsername.bind(this);
        this.changeEmail = this.changeEmail.bind(this);
        this.changePassword = this.changePassword.bind(this);
    }

    componentWillMount() {
        this.placeholder = {
            username: 'yeni kullanıcı adı',
            email: 'yeni email',
            newPassword: 'yeni şifreniz',
            oldPassword: 'eski şifreniz'
        }
        
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
    changeUsername(event) {
        event.preventDefault();
        Meteor.call('changeUsername',
            this.state.username,
            (error) => {
                if (error) {
                    this._notificationSystem.addNotification({
                        message: 'Kullanıcı adı değiştirilirken bir sorunla karşılaşıldı.',
                        level: 'error'
                    });
                } else {
                    this._notificationSystem.addNotification({
                        message: 'Kullanıcı adınız başarıyla değiştirildi.',
                        level: 'success'
                    });
                }
            });
    }
    changeEmail(event) {
        event.preventDefault();
        Meteor.call('changeEmail',
            this.state.email,
            (error) => {
                if (error) {
                    this._notificationSystem.addNotification({
                        message: 'Email değiştirilirken bir sorunla karşılaşıldı.',
                        level: 'error'
                    });
                } else {
                    this._notificationSystem.addNotification({
                        message: 'Email başarıyla değiştirildi.',
                        level: 'success'
                    });
                }
            });
    }
    changePassword(event) {
        event.preventDefault();
        if (this.state.oldPassword === this.state.newPassword) {
            this._notificationSystem.addNotification({
                        message: 'Yeni şifreniz eskisiyle aynı olamaz.',
                        level: 'error'
            });
            return;
        }
        try {
            Accounts.changePassword(this.state.oldPassword, this.state.newPassword);
            this._notificationSystem.addNotification({
                        message: 'Şifreniz başarıyla değiştirildi.',
                        level: 'success'
                    });
        }
        catch (err) {
            this._notificationSystem.addNotification({
                        message: 'Şifreniz değiştirilirken bir sorunla karşılaşıldı.',
                        level: 'error'
            });
        }
    }
    render() {
        return (
            <div>
                <Tabs>
                    <TabList>
                        <Tab>Kullanıcı Adı Düzenle</Tab>
                        <Tab>Email Düzenle</Tab>
                        <Tab>Şifre Düzenle</Tab>
                        <Tab>İçeriklerim</Tab>
                    </TabList>

                    <TabPanel>
                        <div className="profile-info">
                            <div id="login">
                                <form onSubmit={this.changeUsername}>
                                    <input
                                        type="text"
                                        placeholder={this.placeholder.username}
                                        id="username"
                                        name="username"
                                        onChange={this.handleInputChange}
                                        required

                                    />
                                    <input
                                        type="submit"
                                        className="login-sbmt"
                                        value="Değiştir"
                                    />
                                </form>

                            </div>
                        </div>
                    </TabPanel>
                    <TabPanel>
                        <div className="profile-info">
                            <div id="login">
                                <form onSubmit={this.changeEmail}>
                                    <input
                                        type="text"
                                        placeholder={this.placeholder.email}
                                        id="email"
                                        name="email"
                                        onChange={this.handleInputChange}
                                        required

                                    />
                                    <input
                                        type="submit"
                                        className="login-sbmt"
                                        value="Değiştir"
                                    />
                                </form>

                            </div>
                        </div>
                    </TabPanel>
                    <TabPanel>
                        <div className="profile-info">
                            <div id="login">
                                <form onSubmit={this.changePassword}>
                                    <input
                                        type="password"
                                        placeholder={this.placeholder.oldPassword}
                                        id="oldPassword"
                                        name="oldPassword"
                                        onChange={this.handleInputChange}
                                        required

                                    />
                                    <input
                                        type="password"
                                        placeholder={this.placeholder.newPassword}
                                        id="newPassword"
                                        name="newPassword"
                                        onChange={this.handleInputChange}
                                        required

                                    />
                                    <input
                                        type="submit"
                                        className="login-sbmt"
                                        value="Değiştir"
                                    />
                                </form>

                            </div>
                        </div>
                    </TabPanel>
                    <TabPanel>dşlaskdşl</TabPanel>

                </Tabs>
                <NotificationSystem ref="notificationSystem" />
            </div>
        );
    }
}
