import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { browserHistory } from 'react-router';
import NotificationSystem from 'react-notification-system';
import Loader from './Loader';
import GetItemUserInfoContainer from './containers/GetItemUserInfoContainer';
import axios from 'axios';
import '../stylesheets/single-category.less';

const initPage = 1;
const limit = 4;
let nextPage = initPage;
export default class SingleCategory extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loader: true,
            longitude: 0,
            latitude: 0,
            itemList: [],
        };
    }

    componentDidMount() {
        this._notificationSystem = this.refs.notificationSystem;

        const geolocation = navigator.geolocation;
        if (!geolocation) {
            this._notificationSystem.addNotification({
                level: 'error',
                message: 'İnternet tarayıcınız lokasyonu desteklemiyor(!)'
            });
            this.getDataOnInit();
        }
        geolocation.getCurrentPosition((position) => {
            this.setState({
                longitude: position.coords.longitude,
                latitude: position.coords.latitude
            });
            this.getDataOnInit();
        }, () => {
            this._notificationSystem.addNotification({
                level: 'error',
                message: 'Lokasyonunuzu tespit edemedik.'
            });
            this.getDataOnInit();
        });
    }
    componentWillReceiveProps(nextProps) {
        if (this.state.longitude > 0 && this.state.latitude > 0) {
            this.getDataOnInit();
        }
    }
    getDataOnInit() {
        Meteor.call('getContentByCat',
            parseInt(this.props.routeParams.id, 10),
            nextPage,
            limit,
            this.state.latitude,
            this.state.longitude,
            (err, res) => {
                if (err) {
                    this.setState({ loader: false });
                } else {
                    this.setState({ itemList: res, loader: false });
                }
            });
    }
    getUserData() {

    }
    getPlaceData(x, y) {
        if (x > 0 && y > 0) {
            const url = 'https://maps.googleapis.com/maps/api/geocode/json?latlng=' + this.state.latitude + ',' + this.state.longitude + '&key=AIzaSyDXu1RenZP_cG408FRikDsLzZYS-S5_54k';
            axios.get(url)
                .then(res => {
                    if (res.data.results.length > 0) {
                        let location = res.data.results[0].address_components[4].long_name + ', ' + res.data.results[0].address_components[3].long_name;
                        return location;
                    } else {
                        return 'Belirsiz.';
                    }
                });
        } else {
            this.setState({
                location: 'Belirsiz'
            });
        }
    }
    getDate() {

    }
    repeatItems() {
        if (this.state.itemList.length > 0) {
        return this.state.itemList.map((item) =>
            <div className='items-container' key={item._id}>
                <div className='item-image'><img role='presentation' src={item.picUrl} /></div>
                <div className='item-title'>{item.content_name}</div>
                <div className='item-description'>{item.content_desc}</div>
                <GetItemUserInfoContainer id={item.user} x={item.loc.x} y={item.loc.y} location='' date={item.date} />
                <div className='item-approve'>Mesaj Gönder</div> <div className='item-remove'> İlana Git </div>
            </div>
        );
    }
    else {
        return <span>Gösterecek hiç bi şey yok :(</span>;
    }
    }
    renderLoader() {
        return <Loader show={this.state.loader} />;
    }
    render() {
        if (this.state.itemList) {
            return (
                <div id="content" key={this.state.key}>
                    {this.repeatItems()}
                    <div className='clearfix' />
                        <div className="loadMoreBtn">Daha Fazla Yükle</div>
                        <NotificationSystem ref="notificationSystem" />   
                        {this.renderLoader()}
                </div>
            );
        } 
    }
}
