import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { browserHistory } from 'react-router';
import NotificationSystem from 'react-notification-system';
import GetItemsContainer from './containers/GetItemsContainer';

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      latitude: 0,
      longitude: 0
    };
  }
  componentWillMount() {
    const geolocation = navigator.geolocation;
        if (!geolocation) {
            this._notificationSystem.addNotification({
                level: 'error',
                message: 'İnternet tarayıcınız lokasyonu desteklemiyor(!)'
            }); 
        }
        geolocation.getCurrentPosition((position) => {
            this.setState({
                longitude: position.coords.longitude,
                latitude: position.coords.latitude
            });
        }, () => {
            this._notificationSystem.addNotification({
                level: 'error',
                message: 'Lokasyonunuzu tespit edemedik.'
            });
        });
  }
  render() {
    return (
        <div id="homeItems">
            <GetItemsContainer latitude={this.state.latitude} longitude={this.state.longitude} />
        </div>
    );
  }
}
