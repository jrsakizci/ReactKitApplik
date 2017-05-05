import { Meteor } from 'meteor/meteor';
import React from 'react';
import { render } from 'react-dom';
import { Router, Route, Link, browserHistory  } from 'react-router';
import AuthContainer from '../imports/ui/auth/AuthContainer';


import Routes from '../imports/ui/Routes.jsx';
import Home from '../imports/ui/Home.jsx';

Meteor.startup(() => {
  render(<AuthContainer />, document.getElementById('render-target'));
});
