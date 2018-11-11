import React, { Component } from 'react';
// import { instanceOf } from 'prop-types';
import { withCookies, Cookies } from 'react-cookie';
import './Homepage.css'

class Home extends Component {

constructor(props) {
    super(props);
    const { cookies } = props
    this.state = {
        admin:cookies.get('email') || 0,
        data: [],
    };
    this.getData = this.getData.bind(this);
}
getData() {
    /* Here you can implement data fetching */
    const request = new Request('http://127.0.0.1:8080/history');
    fetch(request)
      .then(response => response.json())
        .then(data => { this.setState({data:data})
        console.log(data);
    });
}

componentWillMount() {
    this.getData();
}
  render() {

    return (

      <div>
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Welcome to My Quiz App</h1><br/><br/><br/><br/>
          <h3>Do you have it in you what it takes to become a Champion!</h3>
          { this.state.admin &&
          <a href="/picturesoundquiz"><h1 style={{textAlign:"center"}}>Special Quiz</h1></a>
          }
        </header>
      </div>
            {this.state.admin=="prazwal@quizzer.com" &&
            <div style={{textAlign:"center" , marginLeft:"45%"}}>
            <br/>
             <table  style={{border:"solid 10px"}}>
               <th>Admin Options Available</th>
              <tr>
                <a href="/people">Admin Panel</a>
              </tr>
              </table>
            <br/>
            <br/>
            </div>
          }
      </div>
    );
  }
}

export default withCookies(Home);
