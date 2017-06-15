import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { browserHistory } from 'react-router';
import NotificationSystem from 'react-notification-system';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import Loader from '../Loader';
import '../../stylesheets/manager.less';

export default class GetItemsWaitingApproval extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loader: true,
        };
    }
    componentDidMount() {
        this._notificationSystem = this.refs.notificationSystem;
    }
    getItems() {
        if (this.props.itemList.length > 0) {
            return this.props.itemList.map((item) =>
                <div className='items-container' key={item._id}>
                    <div className='item-image'><img role='presentation' src={item.picUrl} /></div>
                    <div className='item-title'>{item.content_name}</div>
                    <div className='item-description'>{item.content_desc}</div>
                    <div className='item-approve' onClick={() => { this.approveItem(item._id); }}>Onayla</div> <div className='item-remove' onClick={() => { this.removeItem(item._id); }}> Sil </div>
                </div>    
        )};
    }
    approveItem(id) {
        Meteor.call('approveContent', id, (err, resp) => {
            if (!err) {
                this._notificationSystem.addNotification({
                    message: 'İçerik onaylandı. Şimdi herkes tarafından görülebilir',
                    level: 'success'
                });
            } else {
                this._notificationSystem.addNotification({
                    message: 'İçerik onaylanamadı.' + err.Message,
                    level: 'error'
                });
            }
        });
    }
    removeItem(id) {
        Meteor.call('removeContent', id, (err, resp) => {
            if (!err) {
                this._notificationSystem.addNotification({
                    message: 'İçerik başarıyla silindi.',
                    level: 'success'
                });
            } else {
                this._notificationSystem.addNotification({
                    message: 'İçerik silinemedi.' + err.Message,
                    level: 'error'
                });
            }
        });
    }
    loadMore() {
        this.props.loadMore();
    }
     renderLoader() {
        return <Loader show={this.state.loader} />;
    }
    render() {
        return (
            <div id='content'>
                {this.getItems()}
                 <div className='clearfix' />
            <div className='loadMoreBtn' onClick={() => { this.loadMore(); }}>Daha Fazla Yükle</div>
            <NotificationSystem ref='notificationSystem' />
            </div>
        );
    }
}
