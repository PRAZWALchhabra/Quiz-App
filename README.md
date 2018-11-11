# Quiz App [ Golang(APIs) and React(front-end)] ![CI status](https://img.shields.io/badge/build-passing-brightgreen.svg)

The goal is to build a fully functional web application using [Go](https://golang.org) and [React](https://reactjs.org) along with RESTful API.

## To run this project you will require GO and React.

# Go

## Setting up
- For Ubuntu: [Look here](https://www.linode.com/docs/development/go/install-go-on-ubuntu/)
- For MacOS: [Look here](http://sourabhbajaj.com/mac-setup/Go/README.html)
- Apart from above tutorial, add the following to your .bashrc:
```bash
              export GOBIN=$GOPATH/bin
```
- All your code (across projects) goes into one folder. So have your environment variables set up specific to where your code is.
- `bin` stores executables, `pkg` stores external packages, `src` has all your source code.

## Building the server
- [Setting up a server using gin]
- [Gin documentation](https://github.com/gin-gonic/gin/blob/master/README.md) is exhaustive, should resolve any doubts.
- [Using an ORM with SQLite3]
- [A fully functional CRUD API]
- Testing:-
```bash
              # Creating person
              curl -i -X POST http://localhost:8080/people -d '{ "FirstName": "Elvis", "LastName": "Presley"}'

              # Listing persons
              curl -X GET http://localhost:8080/people/

              # List only specific person
              curl -X GET http://localhost:8080/people/1

              # Delete specific user
              curl -i -X DELETE http://localhost:8080/people/1

              # Editing specific row
              curl -i -X PUT http://localhost:8080/people/2 -d '{ "city": "Hyd" }'
```
# React

## Setting up
- First, install node. Then install yarn (because npm is not very nice)
- Ubuntu:
```bash
              curl -sL https://deb.nodesource.com/setup_10.x | sudo -E bash -
              sudo apt-get install -y nodejs
              npm install -g yarn
              yarn global add create-react-app
```
- MacOS:
```bash
              brew install node
              npm install -g yarn
              yarn global add create-react-app
```
- Then, create a new React application by running the following:
```bash
              create-react-app name_of_app
```
- You can run the app by running `yarn start`
- `node_modules` contains all your external packages.
- `package.json` is a json file that contains all the environment requirements of your project. It is similar to the `requirements.txt` file we saw for python.
- `public` stores some static content. The `index.html` file is going to render whatever code you write. You will need to change that based on your application's design.
- ```bash yarn build ``` builds your code into a production ready application. The contents are stored in the `build` directory.
- `src` contains all of your code. This should follow a good directory structure. Read more into it over [here](https://daveceddia.com/react-project-structure/).
- Alternate structure to follow can be found [here](https://medium.com/@alexmngn/how-to-better-organize-your-react-applications-2fd3ea1920f1)



## Running The Web App

Open Three Terminal Tabs

### In The First Tab
```
--> Go To /go/src Directory
$ go run APIs.go
```

### In The Second Tab
```
--> Go To /go/admin/ Directory
$ go run AdminAPIs.go
```

### In The Third Tab
```
--> Go To /react-app
$ yarn install
$ yarn start
```

## Explanation
#### In this project we have built a Single Page Web Application using GOlang and  React.
- In the first tab above we built a server to provide APIs to react-app to make CRU operations on our database.

- In the second tab we built a server to provide APIs for Admin Access to provide full access to database for CRUD operations.

- In the third app we built a react server to render components corresponding for various links.

# Using The App
- A new user register to the web app. The password is hashed and stored in the database.
- Registered user can login by giving their credentials.
- User then can see the leaderboard of the app over all genres.
- In the sidebar various navigation options are provided.
- Go to Quiz to access various genres and here you can view results of your previous attempts also.
- Then select a genre of your choice and you will be redirected to Quiz Panel where you can view different quizzes and start attempting by clicking one.
- Select a answer by clicking on it.
- At the end of your quiz you will be given your score.
- Attempt more to lead the board and earn the crowns.

# Features and Rules
- No two users can have same email-id.
- A cookie is created on every login and stored in your browser to provide uninterrupted usage to the users.
- At places local storage is also used to store information(NOTE:- This doesn't include any user information.)
- While attempting quiz you cannot skip a question ( There is no negative marking so every question deserves a try :) )
- If you refresh your browser window while attempting a question you will lose a chance to attempt the current question.
- The user "Email : prazwal@quizzer.com , Password: qwerty" is given ADMIN access . If you login with this user you are given an option on your homepage to access the AdminPanel. 

# Bonus Questions
#### Sound-Picture Quiz
-  There is a bonus sound/picture quiz on the homepage .
#### Power-Ups
- There is a special SIGNUP bonus provided to the new users. They are given two times the score they actually score.

## Contributing
This project was made as an individual assignment in SSAD course .