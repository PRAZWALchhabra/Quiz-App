import React, { Component } from 'react';
import './Login.css';

function validate(name, email, password) {
  // we are going to store errors for all fields
  // in a signle array
  const errors = [];

  if (name.length === 0) {
    errors.push("Name can't be empty");
  }

  if (email.length < 5) {
    errors.push("Email should be at least 5 charcters long");
  }
  if (email.split('').filter(x => x === '@').length !== 1) {
    errors.push("Email should contain a @");
  }
  if (email.indexOf('.') === -1) {
    errors.push("Email should contain at least one dot");
  }

  if (password.length < 6) {
    errors.push("Password should be at least 6 characters long");
  }

  return errors;
}

class Signup extends Component {
  constructor() {
    super();
    this.state = {
      formData: {
        name: "",
        //lastname: "",
        email: "",
        password: "",
        //usertype: 0,
        SignedIn:0
      },
      errors: [],
      submitted: 0,
    }
    this.handleNChange = this.handleNChange.bind(this);
    //this.handleLChange = this.handleLChange.bind(this);
    this.handleEChange = this.handleEChange.bind(this);
    this.handlePChange = this.handlePChange.bind(this);
    //this.handleUChange = this.handleUChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }


  handleSubmit (event) {
    event.preventDefault();
    const { name, email, password } = this.state.formData;

    const errors = validate(name, email, password);
    if (errors.length > 0) {
      this.setState({ errors });
      return;
    }
    fetch('http://localhost:8080/register', {
     method: 'POST',
     body: JSON.stringify(this.state.formData),
   })
   .then(response => {
        if(response.status >= 200 && response.status < 300)
          this.setState({submitted: 1});
      }).catch(response => {
       // alert("exists");
            this.setState({submitted: -1});
      });
  }

  handleNChange(event) {
    this.state.formData.name = event.target.value;
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
    const { errors } = this.state;
    return (
<div>
<form onSubmit={this.handleSubmit}>
{errors.map(error => (
  <p key={error}>Error: {error}</p>
))}
{ this.state.errors = []}
	<div className="login">
		<div className="login-screen">
			<div className="app-title">
				<h1>Register</h1>
			</div>
 
<div className="login-form">
        <div className="control-group">
          <input type="text" className="login-field" placeholder="Name" value={this.state.firstname} onChange={this.handleNChange}/>
          <label className="login-field-icon fui-user" for="login-name"></label>
				</div>


                <div className="control-group">
                    <input type="text" className="login-field" placeholder="E-Mail" value={this.state.email} onChange={this.handleEChange}/>
                    <label className="login-field-icon fui-user" for="login-name"></label>
				</div>

				<div className="control-group">
                    <input type="password" className="login-field" placeholder="Password" value={this.state.password} onChange={this.handlePChange}/>
                    <label className="login-field-icon fui-lock" for="login-pass"></label>
				</div>

                <div>
                <button type="submit" className="btn btn-default">Sign-Up</button>
			    <a href="/login">Already Registered?</a><br/>

                 {this.state.submitted == 1 &&
                <div>
                    <h2>
                        Succesful Registration
                    </h2>
                </div>
                }
                { this.state.submitted == -1 &&
                  <div>
                    <h2>
                      account exists
                    </h2>
                  </div>
                } 
        </div>

</div>
		</div>
    </div>
</form>
</div>
);
  }
}

export default Signup;
