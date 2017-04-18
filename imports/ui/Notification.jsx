import React, { Component } from 'react';
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';
import '../stylesheets/notification.less';

export default class Notifications extends Component {
    render() {
        return (
           <CSSTransitionGroup transitionName="example" transitionEnterTimeout={500} transitionLeaveTimeout={300}>
                 <div id="notification">
                    <div className={this.props.type === 'error' ? 'notification-inner warning' : 'notification-inner success'}>
                        <i className={this.props.type === 'error' ? 'fa fa-exclamation-circle' : 'fa fa-check-circle'} aria-hidden="true" /> 
                        {this.props.message}
                    </div>
                 </div>
            </CSSTransitionGroup>
        );
    }
}
