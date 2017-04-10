import React, { Component } from 'react';
import {
    BrowserRouter as Router,
    Route,
    Link
} from 'react-router-dom'
import '../../stylesheets/register.less'
export default class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            "email": "email",
            "password": "password"
        };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.submit = this.submit.bind(this);
    }
    handleInputChange(event) {
        const value = event.target.value;
        const name = event.target.name;

        this.setState({
            [name]: value
        });
    }
    submit(event) {
        event.preventDefault();
        console.log(this.state.email + " " + this.state.password);
    }
    render() {
        return (
            <div id="login">
                <form onSubmit={this.submit}>
                    <input type="email" placeholder={this.state.email} id="email" name="email" required onChange={this.handleInputChange} />
                    <input type="password" placeholder={this.state.password} id="password" name="password" required onChange={this.handleInputChange} />
                    <input type="submit" className="login-sbmt" value="Hesap Oluştur" />
                </form>
            </div>
        );
    }
}