import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { browserHistory } from 'react-router';
import NotificationSystem from 'react-notification-system';
import 'react-widgets/lib/less/react-widgets.less';
import categories from '../categories.json';
import Multiselect from 'react-widgets/lib/Multiselect';

export default class NewItem extends Component {

    
    render() {
        const options = [];
        categories.books.forEach((opt) => {
            options.push(opt);
        });
        categories.documents.forEach((opt) => {
            options.push(opt);
        });
        console.log(options);
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
            </div >
        );
    }
}
