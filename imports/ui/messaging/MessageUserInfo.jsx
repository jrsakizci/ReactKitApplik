import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { browserHistory } from 'react-router';
import Moment from 'react-moment';
import axios from 'axios';

export default class GetMessageUserInfo extends Component {
    constructor(props) {
        super(props);
    }
    componentWillMount() {
    }
    render() {
        return (
            <div className="item-info-container">
                <div className="item-info-col"> 
                    Gönderen: {this.props.userInf.username}
                </div>
            </div>
        );
    }
}
