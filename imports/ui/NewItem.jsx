import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { browserHistory } from 'react-router';
import NotificationSystem from 'react-notification-system';
import 'react-widgets/lib/less/react-widgets.less';
import categories from '../categories.json';
import Multiselect from 'react-widgets/lib/Multiselect';
import { Slingshot } from 'meteor/edgee:slingshot';
import { Content } from '../../both/collections';
import Loader from './Loader';
import moment from 'moment';

export default class NewItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            longitude: 0,
            latitude: 0,
            categories: '',
            contentPic: '',
            loader: true
        };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.submitContent = this.submitContent.bind(this);
        this.renderLoader = this.renderLoader.bind(this);
    }
    componentWillMount() {

    }
  
    componentDidMount() {
        this._notificationSystem = this.refs.notificationSystem;
        this.setState({
            loader: false
        });
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

    componentWillReceiveProps(nextProps) {
        if (nextProps.user) {
            if (!nextProps.user.emails[0].verified) {
            this._notificationSystem.addNotification({
                level: 'error',
                message: 'Email adresinizi onaylamadan içerik oluşturamazsınız.. Yönlendiriliyorsunuz..'
            });
            setTimeout(() => {
                    browserHistory.push('/profil');
                }, 1500);
            }
        }
    }

    handleInputChange(event) {
        const value = event.target.value;
        const name = event.target.name;

        this.setState({
            [name]: value
        });
    }
    submitContent(event) {
        event.preventDefault();
        

        Meteor.subscribe('getSingleItem');
        this.setState({
            loader: true
        });
        const uploader = new Slingshot.Upload('bookPic');
        // FIRST UPLOAD IMAGE..
        uploader.send(document.getElementById('filePic').files[0], (error, downloadUrl) => {
            if (error) {
                this._notificationSystem.addNotification({
                    message: error.message,
                    level: 'error'
                });
                this.setState({
                    loader: false
                });
            }
            else {
                this.setState({
                    contentPic: downloadUrl
                });
                // ON SUCCESSFUL ADD ITEM TO DATABASE
                Meteor.call('addNewContent',
                    this.state.document_name,
                    this.state.document_description,
                    this.state.categories,
                    this.state.latitude,
                    this.state.longitude,
                    this.state.contentPic,
                    moment().format(),
                    (err, result) => {
                        if (err) {
                            this._notificationSystem.addNotification({
                                message: 'İçeriğinizi eklerken bir sorunla karşılaştık.',
                                level: 'error'
                            });
                            this.setState({
                                loader: false
                            });
                        } else {
                            this._notificationSystem.addNotification({
                                message: 'İçerik başarıyla oluşturuldu! Yönlendiriliyorsunuz..',
                                level: 'success'
                            });
                            this.setState({
                                loader: false
                            });
                            setTimeout(() => {
                                 browserHistory.push('/icerik/' + result);
                            }, 1000);
                        }
                    });
            }
        });
    }
    renderLoader() {
        return <Loader show={this.state.loader} />;
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
                        onChange={this.handleInputChange}
                        required
                    />
                    <textarea
                        rows="10"
                        placeholder="Kitap/Döküman ne hakkında? Ne kadar eski? vb.."
                        id="document_description"
                        className="document_description"
                        name="document_description"
                        maxLength="500"
                        onChange={this.handleInputChange}
                        required
                    />
                    <Multiselect
                        data={options}
                        valueField='id'
                        textField='name'
                        onChange={value => this.setState({ categories: value })}
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
                {this.renderLoader()}
            </div>
        );
    }
}
