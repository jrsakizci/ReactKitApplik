import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import '../stylesheets/single-item.less';
import { browserHistory } from 'react-router';
import NotificationSystem from 'react-notification-system';
import GetItemUserInfoContainer from './containers/GetItemUserInfoContainer';
import axios from 'axios';
import Loader from './Loader';
export default class ListItems extends Component {
    constructor(props) {
        super(props);
        this.state = {
            location: '',
            username: '',
            userId: '',
            profilePic: '',
            loader: true
        };
        this.renderLoader = this.renderLoader.bind(this);
    }
    componentDidMount() {
        this.setState({
            loader: false
        });
    }
    getItemPic() {
        if (this.props.getSingleItem) {
             this.getPlaceData();
            return this.props.getSingleItem.picUrl ? this.props.getSingleItem.picUrl : null;
        }
    }
    getItemTitle() {
        if (this.props.getSingleItem) {
            return this.props.getSingleItem.content_name ? this.props.getSingleItem.content_name : null;
        }
    }
    getItemDescription() {
         if (this.props.getSingleItem) {
            return this.props.getSingleItem.content_desc ? this.props.getSingleItem.content_desc : null;
        }
    }
    getPlaceData() {
        if (this.props.getSingleItem && this.state.location === '') {
            const url = 'https://maps.googleapis.com/maps/api/geocode/json?latlng=' + this.props.getSingleItem.long + ',' + this.props.getSingleItem.lat + '&key=AIzaSyDXu1RenZP_cG408FRikDsLzZYS-S5_54k';
            axios.get(url)
                .then(res => {
                    if (res.data.results.length > 0) {
                    this.setState({
                        location: res.data.results[0].address_components[4].long_name + ', ' + res.data.results[0].address_components[3].long_name
                    });
                    } else {
                        this.setState({
                            location: 'Lokasyon bilgisi alınamamış.'
                        });
                    }
                });
        }
    }
    getCategories() {
        if (this.props.getSingleItem) {
            return this.props.getSingleItem.content_cats ? this.props.getSingleItem.content_cats : null;
        }
    }
    getUserData() {
         if (this.props.getSingleItem) {
            return this.props.getSingleItem.user ? this.props.getSingleItem.user : null;
        }
    }
    renderLoader() {
        return <Loader show={this.state.loader} />
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
                {this.renderLoader()}
            </div>
        );
    }
}