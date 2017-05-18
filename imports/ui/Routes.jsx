import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import {
  Router,
  Route,
  Link,
  Redirect,
  browserHistory,
} from 'react-router';
import Home from './Home';
import Register from './auth/Register';
import Login from './auth/Login';
import newItem from './NewItem';
import Profile from './Profile';
import ProfileContainer from './ProfileContainer';
import Categories from './Categories';
import '../stylesheets/main.less';
import NotificationSystem from 'react-notification-system';

/* Routes and authentication */
function isUserLoggedIn() {
  if (!Meteor.userId()) {
    browserHistory.push('/giris-yap');
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
  onEnter: isUserLoggedIn,
},
    {
      path: '/giris-yap',
      component: Login,
      onEnter: isUserNotLoggedIn
    }, {
      path: '/kayit-ol',
      component: Register,
      onEnter: isUserNotLoggedIn
    }, {
      path: '/icerik-ekle',
      component: newItem,
      onEnter: isUserLoggedIn
    },
    {
      path: '/icerik/:id',
      component: ListItems
    }, {
      path: '/profil',
      component: ProfileContainer,
      onEnter: isUserLoggedIn
    }, {
      path: '/kategoriler',
      component: Categories
    }
];

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
      browserHistory.push('login');
    }, 1500);
  }
  goRoute(param) {
    setTimeout(() => {
      browserHistory.push(param);
    }, 50);
  }
  render() {
    let loginButton = null;
    let bookLink = null;
    let profileLink = null;

    if (this.props.user.username) {
      loginButton = <a onClick={this.logOut.bind(this)}>Çıkış Yap</a>;
      bookLink = <li onClick={() => this.goRoute('/icerik-ekle')}><i className="fa fa-plus header-icon" aria-hidden="true" /> İçerik Ekle</li>;
      profileLink = <li onClick={() => this.goRoute('/profil')}><a><i className="fa fa-user header-icon" aria-hidden="true" /> Profil</a></li>;
    } else {
      loginButton = <a onClick={() => this.goRoute('/giris-yap')}> Giriş Yap / Üye Ol </a>;
      bookLink = null;
      profileLink = null;
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
              <li onClick={() => this.goRoute('/')}>
                <a>
                  <i className="fa fa-home header-icon" aria-hidden="true" /> Anasayfa</a>
              </li>
              <li onClick={() => this.goRoute('/kategoriler')}>
                <a>
                  <i className="fa fa-book header-icon" aria-hidden="true" /> Kategoriler</a>
              </li>
              <li>
                <a>
                  <i className="fa fa-search header-icon" aria-hidden="true" /> Arama</a>
              </li>
              {bookLink}
              {profileLink}
            </ul>
          </div>
          <div id="mobile-menu" onClick={this.toggleMobileMenu.bind(this)}>
            MENU
        </div>
          <div id="mobile-toggle-menu" className={this.state.showHideMenu ? 'hide' : 'show'}>
            <ul>
              <li>
                <i className="fa fa-home header-icon" aria-hidden="true" />
                <a> Anasayfa</a>
              </li>
              <li>
                <i className="fa fa-book header-icon" aria-hidden="true" />
                <a href="#"> Kategoriler</a>
              </li>
              <li>
                <i className="fa fa-search header-icon" aria-hidden="true" />
                <a href="#"> Arama</a>
              </li>
              <Link to="/add-item">{bookLink}</Link>
              {profileLink}
            </ul>
          </div>

        </div>
        <div className="cf" />
        <div id="content">
          <Router history={browserHistory} routes={routes}>

          </Router>
        </div>
        <NotificationSystem ref="notificationSystem" />
      </div>
    );
  }
}