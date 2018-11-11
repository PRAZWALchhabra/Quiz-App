import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { instanceOf } from 'prop-types';
import { withCookies, Cookies } from 'react-cookie';
import './ViewQuizzes.css'

class ViewQuizzes extends Component {
  
  static propTypes = {
    cookies: instanceOf(Cookies).isRequired
  };

    constructor() {
        super();
        this.state = {
            data: []
        };
        this.getData = this.getData.bind(this);
    }
    getData() {
        const genreid = localStorage.getItem('genreid');
        console.log(genreid)

        /* Here you can implement data fetching */
        var url='http://127.0.0.1:8080/genres/' + genreid;
        const request = new Request(url);
        fetch(request)
        .then(response => response.json())
            .then(data => {this.setState({data:data})
            // console.log(data);
        });
    }

    componentDidMount() {
        this.getData();
    }


  render() {
    function goto(id,a) {
        localStorage.setItem('quizid', id);
        localStorage.setItem('quesno', 0);
    }
    return (
    <div>
        {this.state.data ? (
						this.state.data.map((el, i) => (
                            <div className="quiz">
                                <a onClick={(e) => goto(el.id,el.quizname)} href="/Quiz"><h1>{el.quizname}</h1></a>
                            </div>) )) : (
                            <div className="quiz">Пусто</div>
                        )}      
    </div>
    );
  }
}

export default withCookies(ViewQuizzes);
