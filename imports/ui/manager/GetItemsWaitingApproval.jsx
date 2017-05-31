import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { browserHistory } from 'react-router';
import NotificationSystem from 'react-notification-system';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import Loader from '../Loader';

export default class GetItemsWaitingApproval extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loader: true,
        };
    }
    componentDidMount() {
        this._notificationSystem = this.refs.notificationSystem;
    }
    componentWillReceiveProps(nextProps) {
            
    }
    renderLoader() {
        return <Loader show={this.state.loader} />;
    }
    render() {
        return (

        );
    }
}
