import React, { Component } from 'react';
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';

export default class Notifications extends Component {
    render() {
        return (
            <CSSTransitionGroup transitionName="example" transitionEnterTimeout={300} transitionLeaveTimeout={300}>
                <span className={this.props.type === 'error' ? 'warning' : 'success'}>{this.props.message}</span>
            </CSSTransitionGroup>
        );
    }
}
