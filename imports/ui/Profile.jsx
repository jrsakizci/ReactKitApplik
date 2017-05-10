import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { browserHistory } from 'react-router';
import '../stylesheets/profile.less';
import NotificationSystem from 'react-notification-system';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';


export default class Profile extends Component {

    render() {
        return (
            <Tabs>
                <TabList>
                    <Tab>Bilgilerimi Düzenle</Tab>
                    <Tab>İçeriklerim</Tab>
                </TabList>

                <TabPanel>
                    <h2>Any content 1</h2>
                </TabPanel>
                <TabPanel>
                    <h2>Any content 2</h2>
                </TabPanel>
            </Tabs>
        );
    }
}
