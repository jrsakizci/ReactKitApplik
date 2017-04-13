import React, { Component } from 'react';

import '../../stylesheets/register.less';
import { Meteor } from 'meteor/meteor';

export default class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: 'kullanıcı adı',
            email: 'email',
            password: 'şifre'
        };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.submit = this.submit.bind(this);
    }
    componentWillMount() {
        this.placeholder = {
            username: 'kullanıcı adı',
            email: 'email',
            password: 'şifre'
        };
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
            Meteor.call('newUser', 
                this.state.username, 
                this.state.email, 
                this.state.password, 
                (error) => {
                if (error) {
                    console.log(error);
                }
                else {
                    console.log('aaaa');
                }
            });
        console.log(`${this.state.email} ${this.state.password}`);
    }
    render() {
        return (
            <div id="login">
                <form onSubmit={this.submit}>
                    <input
                        type="text"
                        placeholder={this.placeholder.username}
                        id="username"
                        name="username"
                        required
                        onChange={this.handleInputChange}
                    />
                    <input
                        type="email"
                        placeholder={this.placeholder.email}
                        id="email"
                        name="email"
                        required
                        onChange={this.handleInputChange}
                    />
                    <input
                        type="password"
                        placeholder={this.placeholder.password}
                        id="password"
                        name="password"
                        required
                        onChange={this.handleInputChange}
                    />
                    <input type="submit" className="login-sbmt" value="Hesap Oluştur" />
                </form>
            </div>
        );
    }
}
