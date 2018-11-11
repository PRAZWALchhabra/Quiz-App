import React, { Component } from 'react';
// import { Redirect } from 'react-router-dom';
// import { instanceOf } from 'prop-types';
// import ScriptTag from 'react-script-tag';
import { withCookies, Cookies } from 'react-cookie';
import './Quiz.css'

class ViewQuizzes extends Component {
  
    constructor() {
        super();
        this.state = {
            data: [],
            qno:0,
            score:0
        };
        this.getData = this.getData.bind(this);
        this.goto = this.goto.bind(this);
        this.getResult = this.getResult.bind(this);
    }

    // Retrive Score From The Database
    getResult() {
        var ansarr=JSON.parse(localStorage.getItem("ans"));
        var arr=ansarr.map(Number);
        const quizid = localStorage.getItem('quizid');
        fetch('http://localhost:8080/result/'+quizid, {
            method: 'POST',
            body: JSON.stringify(arr),
          })
          .then(response => response.json())
            .then(data => this.setState({score:data}));       
    }

    getData() {
        const quizid = localStorage.getItem('quizid');
        const questionno =Number(localStorage.getItem('quesno'));

        /* Here you can implement data fetching */

        var url='http://127.0.0.1:8080/quiz/' + quizid +"/"+ questionno;
        const request = new Request(url);
        fetch(request)
        .then(response => response.json())
            .then(data => {
                this.setState({data:[data]});
                this.setState({qno:questionno});
                localStorage.setItem('quesno',questionno+1);
            }).catch(response => {
                     this.setState({data: 0});
                     this.getResult();
                     localStorage.removeItem('ans')
               });
        }

    componentDidMount() {
        this.getData();
    }

    goto(id,quesid) {
        if (this.state.qno){
            var ansstr=localStorage.getItem("ans");
            var ansarr=JSON.parse(ansstr);
            ansarr.push(id.toString());
            ansarr.push(quesid.toString());
            localStorage.setItem("ans", JSON.stringify(ansarr));
        }
        else{
            var ansarr=[]
            ansarr.push(id.toString());
            ansarr.push(quesid.toString());
            localStorage.setItem("ans", JSON.stringify(ansarr));
        }
        this.getData();
    }

  render() {
    return (
    <div>
        {this.state.data ? (
						this.state.data.map((el, i) => (
                        <div>
                            <h1 style={{ textAlign : "center"}}>Lets See If You Can Solve This</h1>
                            <div className="quiz">
                                <h2>{this.state.qno + 1}  :  {el.question}</h2>
                                <a onClick={(e) => this.goto(1,el.id)} ><h3>{el.first}</h3></a>
                                <a onClick={(e) => this.goto(2,el.id)} ><h3>{el.second}</h3></a>
                                <a onClick={(e) => this.goto(3,el.id)} ><h3>{el.third}</h3></a>
                            </div>
                        </div>
                            ) )) : (
                            <div className="quiz">
                                <h1>
                                    Quiz Finished
                                </h1>
                                <h2> You Scored : {this.state.score}</h2>
                                <h2> Try Harder Next Time !!</h2>
                            </div>
                        )}      
    </div>
    );
  }
}

export default withCookies(ViewQuizzes);
