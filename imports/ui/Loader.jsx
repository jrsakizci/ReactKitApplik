import React, { Component } from 'react';
import '../stylesheets/loader.less';

export default class Loader extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className={this.props.show}>
            <div className="animation-container">
                <div className="sk-cube-grid">
                    <div className="sk-cube sk-cube1" />
                    <div className="sk-cube sk-cube2" />
                    <div className="sk-cube sk-cube3" />
                    <div className="sk-cube sk-cube4" />
                    <div className="sk-cube sk-cube5" />
                    <div className="sk-cube sk-cube6" />
                    <div className="sk-cube sk-cube7" />
                    <div className="sk-cube sk-cube8" />
                    <div className="sk-cube sk-cube9" />
                </div>
            </div>
            </div>
        );
    }
}


