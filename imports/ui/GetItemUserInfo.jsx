import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import '../stylesheets/single-item.less';
import { browserHistory } from 'react-router';
import Moment from 'react-moment';
import axios from 'axios';

export default class GetItemUserInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            location: ''
        };
    }
    componentWillMount() {
        if (this.props.x && this.props.y) {
             const url = 'https://maps.googleapis.com/maps/api/geocode/json?latlng=' + this.props.x + ',' + this.props.y + '&key=AIzaSyDXu1RenZP_cG408FRikDsLzZYS-S5_54k';
            axios.get(url)
                .then(res => {
                    if (res.data.results.length > 0) {
                       this.setState({
                           location: res.data.results[0].address_components[4].long_name + ', ' + res.data.results[0].address_components[3].long_name
                       });
                    } else {
                      this.setState({
                          location: 'Belirsiz'
                      });
                    }
                });
        }
    }
    getLocationData() {
        if (this.props.location === '') {
            return this.state.location !== '' ? this.state.location : null;
        }
        else {
            return this.props.location ? this.props.location : null;
        }
    }
    render() {
        return (
            <div className="item-info-container">
                <div className="item-info-col"> 
                    <i className="fa fa-user" /> {this.props.itemUserInfo.username}
                </div>
                <div className="item-info-col">
                    <i className="fa fa-map-marker" /> {this.getLocationData()}
                </div>
                <div className="item-info-col">
                    <i className="fa fa-calendar" /> <Moment format="DD-MM-YY">{this.props.date}</Moment>
                </div>
            </div>
        );
    }
}
