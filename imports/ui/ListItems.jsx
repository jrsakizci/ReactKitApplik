import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import '../stylesheets/single-item.less';
import { browserHistory } from 'react-router';
import NotificationSystem from 'react-notification-system';
import GetItemUserInfoContainer from './containers/GetItemUserInfoContainer';
import axios from 'axios';

export default class ListItems extends Component {
    constructor(props) {
        super(props);
        this.state = {
            location: '',
            username: '',
            userId: '',
            profilePic: ''
        }
    }
    getItemPic() {
        if (this.props.getSingleItem.length > 0) {
            this.getPlaceData();
            return this.props.getSingleItem[0].picUrl ? this.props.getSingleItem[0].picUrl : null;
        }
    }
    getItemTitle() {
        if (this.props.getSingleItem.length > 0) {
            return this.props.getSingleItem[0].content_name ? this.props.getSingleItem[0].content_name : null;
        }
    }
    getItemDescription() {
         if (this.props.getSingleItem.length > 0) {
            return this.props.getSingleItem[0].content_desc ? this.props.getSingleItem[0].content_desc : null;
        }
    }
    getPlaceData() {
        if (this.props.getSingleItem.length > 0 && this.state.location === '') {
            const url = 'https://maps.googleapis.com/maps/api/geocode/json?latlng=' + this.props.getSingleItem[0].long + ',' + this.props.getSingleItem[0].lat + '&key=AIzaSyDXu1RenZP_cG408FRikDsLzZYS-S5_54k';
            axios.get(url)
                .then(res => {
                    this.setState({
                        location: res.data.results[0].address_components[4].long_name + ', ' + res.data.results[0].address_components[3].long_name
                    });
                });
        }
    }
    getCategories() {
        if (this.props.getSingleItem.length > 0) {
            return this.props.getSingleItem[0].content_cats ? this.props.getSingleItem[0].content_cats : null;
        }
    }
    getUserData() {
         if (this.props.getSingleItem.length > 0) {
            return this.props.getSingleItem[0].user ? this.props.getSingleItem[0].user : null;
        }
    }
    render() {
        return (
            <div id="single-item">
                <div className="item-img-container">
                    <img alt={this.getItemTitle()} src={this.getItemPic()} />
                </div>
                <div className="item-content-container">
                    <div className="content-name">{this.getItemTitle()}</div>
                    <div className="content-description">{this.getItemDescription()}</div>
                </div>
                <div className="item-info">
                    <GetItemUserInfoContainer id={this.getUserData()} location={this.state.location} categories={this.getCategories()} />
                </div>
            </div>
        );
    }
}