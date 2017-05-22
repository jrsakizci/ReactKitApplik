import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { browserHistory } from 'react-router';
import NotificationSystem from 'react-notification-system';
import axios from 'axios';

export default class ListItems extends Component {
    constructor(props) {
        super(props);
        this.state = {
            location: ''
        }
    }
    getData() {
        return this.props.getSingleItem ? this.props.getSingleItem : null;
    }
    getPlaceData() {
        if (this.props.getSingleItem.length > 0) {
        const url = 'https://maps.googleapis.com/maps/api/geocode/json?latlng=' + this.props.getSingleItem[0].long + ',' + this.props.getSingleItem[0].lat + '&key=AIzaSyDXu1RenZP_cG408FRikDsLzZYS-S5_54k';
        axios.get(url)
            .then(res => {
                console.log(res);
            });
        }
    }
    render() {
        return (
            <div id="single-item">
               
           </div>
        );
    }
}