import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import '../stylesheets/single-item.less';
import { browserHistory } from 'react-router';
import Moment from 'react-moment';

export default class GetItemUserInfo extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className="item-info-container">
                <div className="item-info-col">
                    <i className="fa fa-user" /> {this.props.itemUserInfo.username}
                </div>
                <div className="item-info-col">
                    <i className="fa fa-map-marker" /> {this.props.location}
                </div>
                <div className="item-info-col">
                    <i className="fa fa-calendar" /> <Moment format="DD-MM-YY">{this.props.date}</Moment>
                </div>
            </div>
        );
    }
}
