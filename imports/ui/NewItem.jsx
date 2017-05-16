import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { browserHistory } from 'react-router';
import NotificationSystem from 'react-notification-system';
import 'react-widgets/lib/less/react-widgets.less';
import categories from '../categories.json';
import Multiselect from 'react-widgets/lib/Multiselect';


export default class NewItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            longitude: 0,
            latitude: 0
        };
        this.submitContent = this.submitContent.bind(this);
    }
    componentWillMount() {
        this.placeholder = {
            username: 'kullanıcı adı',
            password: 'şifre',
            latitude: 0,
            longitude: 0
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
        }
        geolocation.getCurrentPosition((position) => {
            console.log(position);
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
    submitContent(event) {
        event.preventDefault();
        console.log(this.state);
    }
    render() {
        const options = [];
        categories.books.forEach((opt) => {
            options.push(opt);
        });
        categories.documents.forEach((opt) => {
            options.push(opt);
        });
        return (
            <div id="login">
                <form onSubmit={this.submitContent}>
                    <input
                        type="text"
                        placeholder="Döküman Adı"
                        id="document_name"
                        name="document_name"
                        required
                    />
                    <input
                        type="text"
                        placeholder="Kitap/Döküman ne hakkında? Ne kadar eski? vb.."
                        id="document_description"
                        name="document_description"
                        required
                    />
                    <Multiselect
                        data={options}
                        valueField='id'
                        textField='name'
                    />
                    <input
                        type="file"
                        id="filePic"
                        name="filePic"
                        required
                    />
                    <input
                        type="submit"
                        className="login-sbmt"
                        value="Gönder"
                    />
                </form>
            <NotificationSystem ref="notificationSystem" />
            </div>
        );
    }
}
