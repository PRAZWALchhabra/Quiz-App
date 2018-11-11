import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { instanceOf } from 'prop-types';
import { withCookies, Cookies } from 'react-cookie';
import Home from './Homepage';
import './Login.css';

class Login extends Component {

  static propTypes = {
    cookies: instanceOf(Cookies).isRequired
  };
  
  constructor(props) {
    super(props);

    const { cookies } = props

    this.state = {
      formData: {
        email: "",
        password: "",
      },
      submitted: cookies.get('email') || 0,
    }
    this.handleEChange = this.handleEChange.bind(this);
    this.handlePChange = this.handlePChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }


  handleSubmit (event) {
    const { cookies } = this.props;
    event.preventDefault();
    fetch('http://localhost:8080/login', {
     method: 'POST',
     body: JSON.stringify(this.state.formData),
   })
   .then(response => {
    if(response.status >= 200 && response.status < 300)
    {
      // this.setState({submitted: 1});
      if(cookies.get('email')){ 
        cookies.remove('email', { path: '/' })
        cookies.set('email', this.state.formData.email, { path: '/' });
      }
      else{
        cookies.set('email', this.state.formData.email, { path: '/' });
      }
      window.location.reload();
    }
  }).catch(response => {
        // this.setState({submitted: 0});
  });
  }

  handleEChange(event) {
    this.state.formData.email = event.target.value;
  }
  handlePChange(event) {
    this.state.formData.password = event.target.value;
  }


  // Lifecycle hook, runs after component has mounted onto the DOM structure
  // componentDidMount() {
  //   const request = new Request('http://127.0.0.1:8080/register');
  //   fetch(request)
  //     .then(response => response.json())
  //       // .then(data => this.setState({data: data}));
  // }

  
  render() {
    const { cookies } = this.props;

    if (cookies.get('email')){
      return (<Redirect to="/leaderboard"/>)
    }
  
  return (
      <div>
      <form onSubmit={this.handleSubmit}>
        <div className="login">
          <div className="login-screen">
            <div className="app-title">
              <h1>Login</h1>
            </div>
      
            <div className="login-form">
              <div className="control-group">
                <input type="text" className="login-field" placeholder="E-Mail" value={this.state.email} onChange={this.handleEChange}/>
                <label className="login-field-icon fui-user" for="login-name"></label>
              </div>
      
              <div className="control-group">
                <input type="password" className="login-field" placeholder="Password" value={this.state.password} onChange={this.handlePChange}/>
                <label className="login-field-icon fui-lock" for="login-pass"></label>
              </div>

              <div>x
                <input type="submit" className="btn btn-primary btn-large btn-block"/> <br/>
                <a href="/register">New User?</a>
                <br/>
              </div>

            </div>
          </div>
          </div>
      </form>
      </div>
);
  }
}

export default withCookies(Login);
