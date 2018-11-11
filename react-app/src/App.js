import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import { instanceOf } from 'prop-types';
import { withCookies, Cookies } from 'react-cookie';

import './Sidebar.css';
import Login from './components/Login';
import Logout from './components/Logout';
import Signup from './components/Signup';
import Home from './components/Homepage';
import GenreAndHistory from './components/GenreAndHistory';
import ViewQuiz from './components/ViewQuizzes';
import Leaderboard from './components/Leaderboard';
import Quiz from './components/Quiz';
import SoundQuiz from './components/SoundQuiz'
// Admin Functions

import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

class App extends Component {
  static propTypes = {
    cookies: instanceOf(Cookies).isRequired
  };

  constructor(props) {
    super(props);

    const { cookies } = props

    this.state = {
      submitted: cookies.get('email') || 0,
    }
  }
  

  render() {
    function refreshPage(){ 
      setTimeout(function() { window.location.reload(); }, 1000); 
  }
  
  
    return (
      <div>
        <Router>
          <div>
          <div id="mySidenav" className="sidenav">
          { 
            this.state.submitted==0 &&
            <div>
              <a href="/" id="home">Home</a>
              <a href="/login" id="login">Login</a>
              <a href="/register" id="register">Register</a>
              </div>
          }
          {
                        this.state.submitted!=0 &&
                        <div>
                          <a href="/" id="home">Home</a>
                          <a href="/leaderboard" id="login">Standing</a>
                          <a href="/logout" id="leaderboard">Logout</a>
                          <a href="/genre" id="register">Quiz</a>
                        </div>
          }
          </div>
            <Switch>
                 <Route exact path='/' render={() => (<Home cookies={this.props.cookies}/>)}  />
                 <Route exact path='/login' render={() => (<Login cookies={this.props.cookies}/>)} />
                 <Route exact path='/register' render={() => (<Signup cookies={this.props.cookies}/>)} />
                 <Route exact path='/leaderboard' render={() => (<Leaderboard cookies={this.props.cookies}/>)} />
                 <Route exact path='/genre' render={() => (<GenreAndHistory cookies={this.props.cookies}/>)}/>
                 <Route exact path='/ViewQuiz' render={() => (<ViewQuiz cookies={this.props.cookies}/>)} />
                 <Route exact path='/Quiz' render={() => (<Quiz cookies={this.props.cookies}/>)} />
                 <Route exact path='/logout' render={() => (<Logout cookies={this.props.cookies}/>)} onClick={ refreshPage }/>
                 <Route exact path='/picturesoundquiz' render={() => (<SoundQuiz cookies={this.props.cookies}/>)}/>
                 {/* <Route exact path="/genre" render={props => (<Redirect to={`/genre/${props.match.params.id}`}/>)} /> */} 
                 {/* onClick={ refreshPage } */}
                 {
                   this.state.submitted=="prazwal@quizzer.com" &&
                  <Route exact path='/people'component={() => window.location = 'http://127.0.0.1:9000/admin'}  />
                 }
                 {/* <Route exact path='/deleteperson' render={() => (<DeletePerson cookies={this.props.cookies}/>)}  />
                 <Route exact path='/viewquiztoadmin' render={() => (<ViewQuizToAdmin cookies={this.props.cookies}/>)}  />
                 <Route exact path='/createquizadmin' render={() => (<ViewPeople cookies={this.props.cookies}/>)}  /> */}
                 </Switch>
          </div>
        </Router>
      </div>
    );
  }
}

export default withCookies(App);
