import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { browserHistory } from 'react-router';
import NotificationSystem from 'react-notification-system';


export default class NewItem extends Component {

    render() {
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
                    <input 
                        type="file" 
                        name="document_image" 
                        accept="image/x-png,image/gif,image/jpeg" 
                    />
                    <input
                        type="submit"
                        className="login-sbmt"
                        value="Dökümanı Oluştur"
                    />
                </form>
                <NotificationSystem ref="notificationSystem" />
            </div>
    );
    }
}
