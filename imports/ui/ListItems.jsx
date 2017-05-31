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
        this._notificationSystem = this.refs.notificationSystem;
        this.setState({
            loader: false
        });
    }
    componentWillReceiveProps(nextProps) {
       if (nextProps.getSingleItem === false && nextProps.getSingleItemIsReady || nextProps.getSingleItem.isVisible === 0) {
            this._notificationSystem.addNotification({
                level: 'error',
                message: 'Aradığınız içerik bulunamadı, yönlendiriliyorsunuz.'
            });
            this.setState({
                loader: true
            });
            setTimeout(() => {
                browserHistory.push('/');
            }, 1000);
        }
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
            const url = 'https://maps.googleapis.com/maps/api/geocode/json?latlng=' + this.props.getSingleItem.loc.x + ',' + this.props.getSingleItem.loc.y + '&key=AIzaSyDXu1RenZP_cG408FRikDsLzZYS-S5_54k';
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
    getDate() {
         if (this.props.getSingleItem) {
            return this.props.getSingleItem.date ? this.props.getSingleItem.date : null;
        }
    }
    listCategories() {
        if (this.getCategories()) {
            return this.props.getSingleItem.content_cats.map((cat) =>
                <span key={cat.id}>{cat.name} <span className="cat-comma">,</span> </span>
            );
        }
    }
    renderLoader() {
        return <Loader show={this.state.loader} />
    }
    render() {
        return (
            <div id="single-item">
                
                <div className="item-content-container">
                    <div className="content-name">{this.getItemTitle()}</div>
                    <div className="content-categories"><i className="fa fa-book" /> {this.listCategories()}</div>
                    <div className="content-description">{this.getItemDescription()}</div>
                    <GetItemUserInfoContainer id={this.getUserData()} location={this.state.location} date={this.getDate()} />
                </div>
                <div className="item-img-container">
                    <img alt={this.getItemTitle()} src={this.getItemPic()} />
                    <div className="item-message-button">Mesaj Gönder</div>
                </div>
                {this.renderLoader()}
                <NotificationSystem ref="notificationSystem" />
            </div>
        );
    }
}
