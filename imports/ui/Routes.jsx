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
import ForgetPassword from './auth/ForgetPassword';
import Login from './auth/Login';
import VerifyEmail from './auth/VerifyEmail';
import ResetPassword from './auth/ResetPassword';
import NewItemContainer from './containers/NewItemContainer';
import SingleItemConteiner from './containers/SingleItemContainer';
import ProfileContainer from './containers/ProfileContainer';
import ManagerIndexContainer from './manager/ManagerIndexContainer';
import Messages from './messaging/Messages';
import Categories from './Categories';
import SingleCategory from './SingleCategory';
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
},
 {
  path: '/sifremi-unuttum',
  component: ForgetPassword,
  onEnter: isUserNotLoggedIn
}, {
  path: '/icerik-ekle',
  component: NewItemContainer,
  onEnter: isUserLoggedIn
},
{
  path: '/icerik/:id',
  component: SingleItemConteiner
}, {
  path: '/profil',
  component: ProfileContainer,
  onEnter: isUserLoggedIn
}, {
  path: '/kategoriler',
  component: Categories
},
{
  path: '/kategori/:id',
  component: SingleCategory
},
{
  path: '/dokuman/:id',
  component: SingleCategory
},
{
  path: 'verify-email/:id',
  component: VerifyEmail
},
{
  path: 'reset-password/:id',
  component: ResetPassword,
  onEnter: isUserNotLoggedIn
},
{
  path: '/manager',
  component: ManagerIndexContainer,
  onEnter: isUserLoggedIn
},
{
  path: '*',
  component: Home
}
];

export default class Routes extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showHideMenu: 'hide',
      showSearchMenu: 'hide'
    };
  }
  componentDidMount() {
    this._notificationSystem = this.refs.notificationSystem;
  }
  toggleMobileMenu() {
    this.setState({ showHideMenu: !this.state.showHideMenu });
  }
  toggleSearchCats() {
    this.setState({ showSearchMenu: !this.state.showSearchMenu });
  }
  logOut() {
    this._notificationSystem.addNotification({
      level: 'info',
      message: 'Çıkış yaptınız, yönlendiriliyorsunuz lütfen bekleyin.'
    });
    Meteor.logout();
    setTimeout(() => {
      browserHistory.push('giris-yap');
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
      loginButton = <a onClick={this.logOut.bind(this)}><i className="fa fa-sign-out" aria-hidden="true" /> Çıkış Yap</a>;
      bookLink = <li onClick={() => this.goRoute('/icerik-ekle')}><i className="fa fa-plus header-icon" aria-hidden="true" /> İçerik Ekle</li>;
      profileLink = <li onClick={() => this.goRoute('/profil')}><a><i className="fa fa-user header-icon" aria-hidden="true" /> Profil</a></li>;
    } else {
      loginButton = <a onClick={() => this.goRoute('/giris-yap')}> <i className="fa fa-sign-in" aria-hidden="true" /> Giriş Yap / Üye Ol </a>;
      bookLink = null;
      profileLink = null;
    }
    return (
      <div id="element">
        <div id="header">
          <div className="header-top">
            <div className="login-area">
              {loginButton}
            </div>
            <div>
              <ul className="social-networks">
                <li>
                  <i className="fa fa-facebook"></i>
                </li>
                <li>
                  <i className="fa fa-twitter"></i>
                </li>
                <li>
                  <i className="fa fa-instagram"></i>
                </li>
              </ul>
            </div>

            <div className="cf" />
          </div>
          <div className="logo-area">
            <div id="logo">
              <img src="http://4.bp.blogspot.com/-WbHYU-bG5ho/VNP2k-lVjBI/AAAAAAAABWA/zBCShgPtYMQ/s1600/new-logo.png" alt="" />
            </div>
          </div>
          <div className="search-area">
            <div className="search-container">
              <div className="searchSubjectContainer" onClick={this.toggleSearchCats.bind(this)}>
                Hepsi <i className="fa fa-sort" />
              </div>
              <div id="searchCategoriesList" className={this.state.showSearchMenu ? 'hide' : 'show'}>
                <ul>
                  <li>Döküman</li>
                  <li>Kitap</li>
                </ul>
              </div>
              <input type="text" placeholder="Arama yap.." />
            </div>
          </div>
          <div className="nav-area">
            <div className="header-links">
              <div className="message">
               <Messages />
              </div>
            </div>
          </div>
          <div className="cf" />
        </div>
        <div id="sidebar">
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
              <Link to="/add-item">{bookLink}</Link>
              {profileLink}
            </ul>
          </div>

        </div>
        <div id="content">
          <Router history={browserHistory} routes={routes}>

          </Router>
        </div>
        <NotificationSystem ref="notificationSystem" />
      </div>
    );
  }
}
