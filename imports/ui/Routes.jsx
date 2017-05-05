import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import {
  Router,
  Route,
  Link,
  Redirect,
  browserHistory
} from 'react-router';
import Home from './Home';
import Register from './auth/Register';
import Login from './auth/Login';
import '../stylesheets/main.less';
import NotificationSystem from 'react-notification-system';

/* Routes and authentication */
function isUserLoggedIn() {
  if (!Meteor.userId()) {
    browserHistory.push('/login');
  }
}
function isUserNotLoggedIn() {
  if (Meteor.userId()) {
    browserHistory.push('/');
  }
}
/* Routes */
const routes = [{
  path: '/',
  component: Home,
  onEnter: isUserLoggedIn
},
{
  path: '/login',
  component: Login,
  onEnter: isUserNotLoggedIn
}, {
  path: '/register',
  component: Register,
  onEnter: isUserNotLoggedIn
}];

export default class Routes extends React.Component {
  constructor(props) {
    super(props);
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
      browserHistory.push('/login');
    }, 1500);
  }
  render() {
    let loginButton = null;
    if (this.props.user.username) {
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
          <Router history={browserHistory} routes={routes}>
            <div className="container">
            </div>
          </Router>
        </div>
        <NotificationSystem ref="notificationSystem" />
      </div>
    );
  }
}