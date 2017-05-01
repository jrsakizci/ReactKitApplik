import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';
import Home from './Home';
import Register from './auth/Register';
import Login from './auth/Login';
import '../stylesheets/main.less';


export default class Routes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showHideMenu: 'hide',
    };
  }
  toggleMobileMenu() {
    this.setState({ showHideMenu: !this.state.showHideMenu });
  }
  isUserLoggedIn(nextState, replace, callback) {
    Meteor.subscribe('currentUser', () => {
      if (Meteor.user()) {
        return true;
      } else {
        return false;
      }
    });
  }
  render() {
    return (
      <div id="element">
        <div id="sidebar">
          <div className="fl left-side">
            <div id="logo" Link to="/">
              <img src="http://4.bp.blogspot.com/-WbHYU-bG5ho/VNP2k-lVjBI/AAAAAAAABWA/zBCShgPtYMQ/s1600/new-logo.png" alt="" />
            </div>
          </div>
          <div className="fr right-side">
            <div id="login-top">
              Giriş Yap / Üye Ol
          </div>

          </div>
          <div id="menu">
            <ul>
              <li>
                <a>
                  <i className="fa fa-home header-icon" aria-hidden="true" /> Anasayfa</a>
              </li>
              <li>
                <a href="#">
                  <i className="fa fa-book header-icon" aria-hidden="true" /> Kategoriler</a>
              </li>
              <li>
                <a href="#">
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
          <Router>
            <div className="container">
              <Route exact path='/' component={Home} />
              <Route path='/register' component={Register} />
              <Route path='/login' component={Login} onEnter={isUserLoggedIn.bind(this)} />
            </div>
          </Router>
        </div>
      </div>
    );
  }
}
