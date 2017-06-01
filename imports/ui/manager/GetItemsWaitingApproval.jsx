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
    loadMore() {
        this.props.loadMore();
    }
    getItems() {
        if (this.props.itemList.length > 0) {
            return this.props.itemList.map((item) =>
                <span key={item._id}>{item.content_name} <span className="cat-comma">,</span> </span>
            )}
    }
    render() {
        return (
            <div>
                {this.getItems()}
            <span onClick={() => { this.loadMore(); }}>Load More</span>
            </div>
        );
    }
}
