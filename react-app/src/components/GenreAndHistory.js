import React, { Component } from 'react';
import { withCookies } from 'react-cookie';
import './GenreAndHistory.css'

class GenreAndHistory extends Component {
  
  constructor() {
    super();
    this.state = {
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
    // {require('/one.jpeg')}
    function goto(id) {
        localStorage.setItem('genreid', id);
    }
    return (
    <div>
        <h1 style={{textAlign:"center"}}>
            Genres
        </h1>
        <div className="row" style={{marginLeft : "10%"}}>
            <div className="column">
                <a onClick={(e) => goto(1)} href="/ViewQuiz"><img src={require("./Genres/Politics.jpg")} alt="Politics" style={{width : "100%"}}/><span className="tooltiptext">Politics<br/>Topper Of This Genre: Prazwal(prazwal@quizzer.com)</span></a>
            </div>
            <div className="column">
                <a onClick={(e) => goto(2)} href="/ViewQuiz"><img src={require("./Genres/Sports.jpg")} alt="Sports" style={{width : "100%"}}/><span className="tooltiptext">Sports<br/>Topper Of This Genre: Prazwal(prazwal@quizzer.com)</span></a>
            </div>
            <div className="column">
                <a onClick={(e) => goto(3)} href="/ViewQuiz"><img src={require("./Genres/Science.jpg")} alt="Science"  style={{width : "100%"}}/><span className="tooltiptext">Science<br/>Topper Of This Genre: Prazwal(prazwal@quizzer.com)</span></a>
            </div>
            <div class="column">
                <a onClick={(e) => goto(4)} href="/ViewQuiz"><img src={require("./Genres/Misce.jpg")} alt="Misc."  style={{width : "100%"}} /><span className="tooltiptext">Misc.<br/>Topper Of This Genre: Prazwal(prazwal@quizzer.com)</span></a>
            </div>
      </div>
      <h1 style={{textAlign:"center"}}>Previous Attempts</h1>
      {
          this.state.data ?

          this.state.data.map((el, i) => (
            <div>
              <br/><br/>
              <h4 style={{textAlign:"center"}}>{i+1})  {el.quiznam} ------> {el.scr}</h4>
            </div>
            )
            )
        :
        (<div>
            <p style={{textAlign:"center"}}>
             No Attempts Found!
            </p>
        </div>)

      }
    </div>
    );
  }
}

export default withCookies(GenreAndHistory);
