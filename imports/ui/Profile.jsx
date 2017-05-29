import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { browserHistory } from 'react-router';
import '../stylesheets/profile.less';
import NotificationSystem from 'react-notification-system';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { Slingshot } from 'meteor/edgee:slingshot';
import Loader from './Loader';

export default class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: 'kullanıcı adı',
            email: 'email',
            oldPassword: 'eski şifre',
            newPassword: 'yeni şifre',
            loader: true
        };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.changeUsername = this.changeUsername.bind(this);
        this.changeEmail = this.changeEmail.bind(this);
        this.changePassword = this.changePassword.bind(this);
        this.uploadPic = this.uploadPic.bind(this);
        this.renderLoader = this.renderLoader.bind(this);
    }

    componentWillMount() {
        this.placeholder = {
            username: 'yeni kullanıcı adı',
            email: 'yeni email',
            newPassword: 'yeni şifreniz',
            oldPassword: 'eski şifreniz'
        };
    }

    componentDidMount() {
        this._notificationSystem = this.refs.notificationSystem;
        this.setState({
            loader: false
        });
    }
    componentWillReceiveProps() {

    }
    renderLoader() {
        return <Loader show={this.state.loader} />;
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
        this.setState({
            loader: true
        });
        Meteor.call('changeUsername',
            this.state.username,
            (error) => {
                if (error) {
                    this._notificationSystem.addNotification({
                        message: 'Kullanıcı adı değiştirilirken bir sorunla karşılaşıldı. Aynı kullanıcı adı kullanılıyor olabilir.',
                        level: 'error'
                    });
                } else {
                    this._notificationSystem.addNotification({
                        message: 'Kullanıcı adınız başarıyla değiştirildi.',
                        level: 'success'
                    });
                }
                this.setState({
                    loader: false
                });
            });
    }
    changeEmail(event) {
        event.preventDefault();
        this.setState({
            loader: true
        });
        Meteor.call('changeEmail',
            this.state.email,
            (error) => {
                if (error) {
                    this._notificationSystem.addNotification({
                        message: 'Email değiştirilirken bir sorunla karşılaşıldı. Aynı email kullanılıyor olabilir.',
                        level: 'error'
                    });
                } else {
                    this._notificationSystem.addNotification({
                        message: 'Email başarıyla değiştirildi.',
                        level: 'success'
                    });
                }
                this.setState({
                    loader: false
                });
            });
    }
    changePassword(event) {
        event.preventDefault();
        this.setState({
            loader: true
        });
        if (this.state.oldPassword === this.state.newPassword) {
            this._notificationSystem.addNotification({
                message: 'Yeni şifreniz eskisiyle aynı olamaz.',
                level: 'error'
            });
            this.setState({
                loader: false
            });
            return;
        }
        try {
            Accounts.changePassword(this.state.oldPassword, this.state.newPassword);
            this.setState({
                loader: false
            });
            this._notificationSystem.addNotification({
                message: 'Şifreniz başarıyla değiştirildi.',
                level: 'success'
            });

        }
        catch (err) {
            this.setState({
                loader: false
            });
            this._notificationSystem.addNotification({
                message: 'Şifreniz değiştirilirken bir sorunla karşılaşıldı.',
                level: 'error'
            });
        }
    }
    uploadPic(event) {
        event.preventDefault();
        this.setState({
            loader: true
        });
        try {
            const uploader = new Slingshot.Upload('profilePic');
            uploader.send(document.getElementById('filePic').files[0], (error, downloadUrl) => {
                if (error) {
                    this._notificationSystem.addNotification({
                        message: error.message,
                        level: 'error'
                    });
                    this.setState({
                        loader: false
                    });
                }
                else {
                    try {
                        Meteor.users.update(Meteor.userId(), { $set: { 'profile.profilePic': downloadUrl } });
                        this.setState({
                            loader: false
                        });
                        this._notificationSystem.addNotification({
                            message: 'Resminiz kaydedildi.',
                            level: 'success'
                        });

                    }
                    catch (err) {
                        this.setState({
                            loader: false
                        });
                        this._notificationSystem.addNotification({
                            message: 'Resmi veritabanına kaydederken bi hata oluştu lütfen sonra tekrar deneyiniz.',
                            level: 'error'
                        });
                    }
                }
            });

        } catch (err) {
            this.setState({
                loader: false
            });
            throw err;
        }

    }
    getProfilePic() {
        return this.props.user.profile ? <img role='presentation' src={this.props.user.profile.profilePic} /> : null;
    }
    getEmailAddress() {
        return this.props.user.profile ? <p className="info">Kayıtlı Emailiniz: <strong> {this.props.user.emails[0].address} </strong></p> : null;
    }
    render() {
        return (

            <div>
                <Tabs>
                    <TabList>
                        <Tab>Kullanıcı Adı Düzenle</Tab>
                        <Tab>Email Düzenle</Tab>
                        <Tab>Şifre Düzenle</Tab>
                        <Tab>Profil Resmi Düzenle</Tab>
                        <Tab>Kitap / Dökümanlarım</Tab>
                    </TabList>

                    <TabPanel>
                        <div className="profile-info">
                            <div id="login">
                                <p className="info">Kayıtlı Kullanıcı Adınız: <strong> {this.props.user.username} </strong></p>
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
                                        value="Güncelle"
                                    />
                                </form>

                            </div>
                        </div>
                    </TabPanel>
                    <TabPanel>
                        <div className="profile-info">
                            <div id="login">
                                {this.getEmailAddress()}
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
                                        value="Güncelle"
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
                                        value="Güncelle"
                                    />
                                </form>

                            </div>
                        </div>
                    </TabPanel>
                    <TabPanel>
                        <div className="profile-info">
                            <div id="login">
                                {this.getProfilePic()}
                                <p>En fazla 1MB ve 500x500 resim kullanabilirsiniz.</p>
                                <form onSubmit={this.uploadPic}>
                                    <input
                                        type="file"
                                        id="filePic"
                                        name="filePic"
                                        required
                                    />
                                    <input
                                        type="submit"
                                        className="login-sbmt"
                                        value="Güncelle"
                                    />
                                </form>

                            </div>
                        </div>
                    </TabPanel>
                    <TabPanel>

                    </TabPanel>
                </Tabs>
                <NotificationSystem ref="notificationSystem" />
                {this.renderLoader()}
            </div>

        );
    }
}
