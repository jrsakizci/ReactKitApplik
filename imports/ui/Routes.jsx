import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect
} from 'react-router-dom';
import Home from './Home';
import Register from './auth/Register';
import Login from './auth/Login';
import AuthContainer from './auth/AuthContainer';
import '../stylesheets/main.less';
import NotificationSystem from 'react-notification-system';
import createHistory from 'history/createBrowserHistory';
import PropTypes from 'prop-types';

export const history = createHistory();


export function isUserLoggedIn() {
  
}
const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={props => (
    isUserLoggedIn() ? (
      <Component {...props} />
    ) : (
        <Redirect to={{
          pathname: '/login',
        }} />
      )
  )} />
)

const ProtectedRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={props => (
    !isUserLoggedIn() ? (
      <Component {...props} />
    ) : (
        <Redirect to={{
          pathname: '/',
        }} />
      )
  )} />
)

export default class Routes extends React.Component {
  constructor(props) {
    super(props);
    this.props.user = {};
    console.log(this.props);
    this.state = {
      showHideMenu: 'hide',
    };
  }
  
  componentDidMount() {
    this._notificationSystem = this.refs.notificationSystem;
  }
  toggleMobileMenu() {
    this.setState({ showHideMenu: !this.state.showHideMenu });
  }
  logOut() {
    this._notificationSystem.addNotification({
      level: 'info',
      message: 'Çıkış yaptınız, yönlendiriliyorsunuz lütfen bekleyin.'
    });
    Meteor.logout();
    setTimeout(() => {
      history.push('/login');
      history.go(-1);
    }, 1500);
    
  }
  render() {
    let loginButton = null;
    if (this.props.user) {
      loginButton = <a onClick={this.logOut.bind(this)}>Çıkış Yap</a>;
    } else {
        loginButton = <a>Giriş Yap / Üye Ol</a>;
    }
    return (
      <div id="element">
        <div id="sidebar">
          <div className="fl left-side">
            <div id="logo">
              <img src="http://4.bp.blogspot.com/-WbHYU-bG5ho/VNP2k-lVjBI/AAAAAAAABWA/zBCShgPtYMQ/s1600/new-logo.png" alt="" />
            </div>
          </div>
          <div className="fr right-side">
            <div id="login-top">
              {loginButton}
            </div>
          </div>
          <div id="menu">
            <ul>
              <li>
                <a>
                  <i className="fa fa-home header-icon" aria-hidden="true" /> Anasayfa</a>
              </li>
              <li>
                <a>
                  <i className="fa fa-book header-icon" aria-hidden="true" /> Kategoriler</a>
              </li>
              <li>
                <a>
                  <i className="fa fa-search header-icon" aria-hidden="true" />Arama</a>
              </li>
            </ul>
          </div>
          <div id="mobile-menu" onClick={this.toggleMobileMenu.bind(this)}>
            MENU
        </div>
          <div id="mobile-toggle-menu" className={this.state.showHideMenu ? 'hide' : 'show'}>
            <ul>
              <li>
                <i className="fa fa-home header-icon fl" aria-hidden="true" />
                <a className="fr">Anasayfa</a>
              </li>
              <div className="cf" />
              <li>
                <i className="fa fa-book header-icon fl" aria-hidden="true" />
                <a href="#" className="fr"> Kategoriler</a>
              </li>
              <div className="cf" />
              <li>
                <i className="fa fa-search header-icon fl" aria-hidden="true" />
                <a href="#" className="fr"> Arama</a>
              </li>
              <div className="cf" />
              <li>
                <i className="fa fa-plus header-icon fl" aria-hidden="true" />
                <a href="#" className="fr"> Kitap Ekle</a>
              </li>
              <div className="cf" />
            </ul>
          </div>

        </div>
        <div className="cf" />
        <div id="content">
          <Router history={history}>
            <div className="container">
              <PrivateRoute exact path='/' component={Home} />
              <ProtectedRoute path='/register' component={Register} />
              <ProtectedRoute path='/login' component={Login} />
            </div>
          </Router>
        </div>
        <NotificationSystem ref="notificationSystem" />
      </div>
    );
  }
}
