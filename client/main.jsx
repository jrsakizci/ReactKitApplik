import { Meteor } from 'meteor/meteor';
import React from 'react';
import { render } from 'react-dom';
import { Router, Route, Link, IndexRoute, browserHistory  } from 'react-router-dom';


import Routes from '../imports/ui/Routes.jsx';
import Home from '../imports/ui/Home.jsx';

Meteor.startup(() => {
  render(<Routes />, document.getElementById('render-target'));
});