import React, { Component } from 'react';
import { withCookies, Cookies } from 'react-cookie';
import './Quiz.css'

class ViewQuizzes extends Component {
  
    constructor() {
        localStorage.setItem('submitted',0);
        super();
        this.state = {
            data: [2,1,3,1,2],
            submitted:0,
            score: localStorage.getItem('submitted')
        };
        this.getResult = this.getResult.bind(this);
    }

    // Retrive Score From The Database
    getResult() {
        console.log("FUCKED")
        if (document.querySelector('input[name=first]:checked').value=="3")
        {
            this.state.score++;
        }
        if (document.querySelector('input[name=second]:checked').value=="2")
        {
            this.state.score++;
        }
        if (document.querySelector('input[name=third]:checked').value=="4")
        {
            this.state.score++;
        }
        if (document.querySelector('input[name=fourth]:checked').value=="2")
        {
            this.state.score++;
        }
        if (document.querySelector('input[name=fifth]:checked').value=="3")
        {
            this.state.score++;
        }
        localStorage.setItem('submitted',1)
        this.forceUpdate()
        // window.location.reload()
    }

  render() {
      if (localStorage.getItem('submitted')==1){
          return(
              <div>
                  <div className="quiz">
                                <h1>
                                    Quiz Finished
                                </h1>
                                <h2> You Scored : {this.state.score}</h2>
                                <h2> Try Harder Next Time !!</h2>
                  </div>
              </div>
          )
      }
    return (
        <div>
        <h1 style={{textAlign:"center"}}> Solve IT!</h1>
        <div className="quiz">
        <h2>Guess the Animal/Bird</h2>
        <audio controls>
        <source src={require("./SoundQuiz/q1.ogg")} type="audio/ogg"/>
        Your browser does not support the audio element.
        </audio>
        <h3><input name="first" type="radio" value="1" checked/>1. Horse</h3>
        <h3><input name="first" type="radio" value="2"/>2. Dog</h3>
        <h3><input name="first" type="radio" value="3"/>3. Cat</h3>
        <h3><input name="first" type="radio" value="4"/>4. None</h3>

        <h2>Guess which Video Game is this?</h2>
        <audio controls>
        <source src={require("./SoundQuiz/q2.ogg")} type="audio/ogg"/>
        {/* <source src="horse.mp3" type="audio/mpeg"/> */}
        Your browser does not support the audio element.
        </audio>
        <h3><input name="second" type="radio" value="1"checked/>Counter Strike</h3>
        <h3><input name="second" type="radio" value="2"/>Super Mario Bros.</h3>
        <h3><input name="second" type="radio" value="3"/>Contra</h3>
        <h3><input name="second" type="radio" value="4"/>PES 2018</h3>

        <h2>Guess the animal?</h2>
        <audio controls>
        <source src={require("./SoundQuiz/q3.ogg")} type="audio/ogg"/>
        Your browser does not support the audio element.
        </audio>
        <h3><input name="third" type="radio" value="1" checked />1. Snake</h3>
        <h3><input name="third" type="radio" value="2"/>2. Dog</h3>
        <h3><input name="third" type="radio" value="3"/>3. Lizard</h3>
        <h3><input name="third" type="radio" value="4"/>4. Frog</h3>

        <h2>Guess the Comic Character?</h2>
        <img src={require("./SoundQuiz/q4.jpg")}/>
        <h3><input name="fourth" type="radio" value="1" checked/>1. IronMan</h3>
        <h3><input name="fourth" type="radio" value="2"/>2. Shaktimaan</h3>
        <h3><input name="fourth" type="radio" value="3"/>3. Chacha Chaudhary</h3>
        <h3><input name="fourth" type="radio" value="4"/>4. Shahrukh Khan</h3>

        <h2>Guess the Programming Language?</h2>
        <img src={require("./SoundQuiz/q5.png")}/>
        <h3><input name="fifth" type="radio" value="1" checked/>MEAN Stack</h3>
        <h3><input name="fifth" type="radio" value="2"/>neo4J</h3>
        <h3><input name="fifth" type="radio" value="3"/>Golang</h3>
        <h3><input name="fifth" type="radio" value="4"/>C#</h3>
        <button onClick={(e)=> this.getResult()} style={{marginLeft:"45%"}}>I have marked the correct answers.</button>
        </div>
        </div>

    );
  }
}

export default withCookies(ViewQuizzes);
