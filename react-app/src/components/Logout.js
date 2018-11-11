import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Redirect } from 'react-router-dom';

import { instanceOf } from 'prop-types';
import { withCookies, Cookies } from 'react-cookie';

import Home from './Homepage';

import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

class App extends Component {

// Lifecycle hook, runs after component has mounted onto the DOM structure

  constructor(props) {
    super(props);

    const { cookies } = props

    cookies.remove('email', { path: '/' })

    // window.location.reload()
  }

  render(){
      return (<Redirect to="/"/>);
  }
}

export default withCookies(App);
