import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { browserHistory } from 'react-router';
import '../stylesheets/profile.less';
import NotificationSystem from 'react-notification-system';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';


export default class Profile extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Tabs>
                <TabList>
                    <Tab>Bilgilerimi Düzenle</Tab>
                    <Tab>İçeriklerim</Tab>
                </TabList>

                <TabPanel>
                   <div className="profile-info">
                        <div id="login">
                            <form onSubmit={this.submit}>
                                <label for="username">Yeni Kullanıcı Adı</label>
                                <input
                                    type="text"
                                    placeholder={this.props.user.username}
                                    id="username"
                                    name="username"
                                    required

                                />
                                <label for="email">Yeni Email</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    required
                                />
                                <label for="password">Yeni Şifre</label>
                                <input
                                    type="password"
                                    id="password"
                                    name="password"
                                    required
                                />
                                <input
                                    type="submit"
                                    className="login-sbmt"
                                    value="Hesap Oluştur"
                                />
                            </form>
                
            </div>
                   </div>
                </TabPanel>
                <TabPanel>
                    <h2>Any content 2</h2>
                </TabPanel>
                <NotificationSystem ref="notificationSystem" />
            </Tabs>
            
        );
    }
}
