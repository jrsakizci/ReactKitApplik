import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import '../stylesheets/single-item.less';
import { browserHistory } from 'react-router';

export default class GetItemUserInfo extends Component {
    constructor(props) {
        super(props);
    }
    getCategories() {
        if (this.props.categories) {
            return this.props.categories.map((cat) =>
                <span key={cat.id}>{cat.name}</span>
            );
        }
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
                    <i className="fa fa-book" /> {this.getCategories()}
                </div>
                <div className="item-info-col">
                    <div className="item-message-button">Mesaj Gönder</div>
                </div>
            </div>
        );
    }
}