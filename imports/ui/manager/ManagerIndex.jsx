import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { browserHistory } from 'react-router';
import NotificationSystem from 'react-notification-system';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import Loader from '../Loader';
import ItemsWaitingApprovalContainer from './ItemsWaitingApprovalContainer';

export default class ManagerIndex extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loader: true,
            showContent: false
        };
    }
    componentDidMount() {
        this._notificationSystem = this.refs.notificationSystem;
    }
    componentWillReceiveProps(nextProps) {

        if (nextProps.userReady && !nextProps.user) {
            setTimeout(() => {
                browserHistory.push('/');
            });
        } else {
            this.setState({
                loader: false,
                showContent: true
            });
            this._notificationSystem.addNotification({
                level: 'success',
                message: 'Hoşgeldin..'
            });
        }
    }
    renderLoader() {
        return <Loader show={this.state.loader} />;
    }
    render() {
        if (this.state.showContent) {
        return (
            <div>
                <Tabs>
                    <TabList>
                        <Tab>Onay Bekleyen Ilanlar</Tab>
                    </TabList>

                    <TabPanel>
                        <ItemsWaitingApprovalContainer />
                    </TabPanel>
                </Tabs>
                <NotificationSystem ref="notificationSystem" />
                {this.renderLoader()}
            </div>
        );
        } else {
            return ( 
                <span>?</span>
            );
        }
    }
}
