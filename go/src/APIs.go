package main

import (
	"fmt"
	"sort"
	"strconv"

	"github.com/gin-contrib/cors" // Why do we need this package? Anyway Not Needed
	"github.com/gin-gonic/gin"
	"github.com/jinzhu/gorm"
	_ "github.com/jinzhu/gorm/dialects/sqlite"
	_ "github.com/mattn/go-sqlite3"
	"golang.org/x/crypto/bcrypt"
)

// declaring the db globally
var db *gorm.DB
var err error
var activeUser uint

type User struct {
	ID          uint   `json:"id"` //if provided then that id else autoincrement
	Name        string `json:"name"`
	Email       string `json:"email"`
	Password    string `json:"password"`
	Score       int    `json:"score"`
	Admin       bool   `json:"admin"`
	Signincount int    `json:"cont"`
}

type Genre struct {
	ID        uint   `json:"id"`
	Genrename string `json:"genrename"`
}

type Quiz struct {
	ID       uint   `json:"id"`
	Quizname string `json:"quizname"`

	// User   User `gorm:"foreignkey:Userid;association_foreignkey:ID"`
	Userid uint `json:"userid"`

	// Genre   Genre `gorm:"foreignkey:Genreid;association_foreignkey:ID"`
	Genreid uint `json:"genreid"`
}

type Answer struct {
	ID uint `json:"id"`

	// Question Question `json:"foreignkey:QuesID;association_foreignkey:ID"`
	Ques uint `json:"ques"`
	Quiz uint `json:"quiz"`

	CorrectAns int `json:"correct"`
}

type Question struct {
	ID       uint   `json:"id"`
	Question string `json:"question"`

	// Genre   Genre `gorm:"foreignkey:GenreID;association_foreignkey:ID"`
	GenreID int `json:"genreid"`

	// Quiz   Quiz `gorm:"foreignkey:Quizno;association_foreignkey:ID"`
	Quizno int `json:"quizno"`

	OptA string `json:"first"`
	OptB string `json:"second"`
	OptC string `json:"third"`

	Qtype string `json:"qtype"`

	// Answer Answer `gorm:"foreignkey:AnsID;association_foreignkey:ID"`
	// Uncommenting Above Gives Recursive Definition Error as Ques->Ans and Ans->Ques
	AnsID uint `json:"ansid"`
}

type Score struct {
	Quiznum uint   `json:"quiznum"`
	Quiznam string `json:"quiznam"`
	Usernum uint   `json:"usernum"`
	Scr     int    `json:"scr"`
}

func HashPassword(password string) (string, error) {
	bytes, err := bcrypt.GenerateFromPassword([]byte(password), bcrypt.MinCost) //added salt
	return string(bytes), err
}

func CheckPasswordHash(password string, hash string) bool {
	err := bcrypt.CompareHashAndPassword([]byte(hash), []byte(password))
	fmt.Println(err == nil)
	return err == nil
}

func main() {
	activeUser = 1
	db, err = gorm.Open("sqlite3", "./quiz.db")
	if err != nil {
		fmt.Println(err)
	}
	defer db.Close()

	db.AutoMigrate(&User{}, &Genre{}, &Question{}, &Quiz{}, &Score{}, &Answer{})
	r := gin.Default()

	//////////////////////////////////////////////////////////////////////
	r.POST("/register", Signup)
	r.POST("/login", Login)
	r.GET("/leaders", Leaders)
	r.GET("/history", History)
	r.GET("/genres/:id", GenreQuizzes)
	r.GET("/quiz/:id1/:id2", QuizQuestions)
	r.POST("/result/:quizid", Result)
	// Admin Functions
	r.Use((cors.Default()))
	db.LogMode(true)
	r.Run(":8080") // Run on port 8080
}

func Signup(c *gin.Context) {
	var user User
	c.BindJSON(&user)
	fmt.Println(user.Email)
	d := db.Where("email = ?", user.Email).Find(&user).RecordNotFound()
	if d {
		db.Create(&user)
		// hash the password
		pass := user.Password
		fmt.Println(pass)
		hashed_pass, err := HashPassword(pass)
		if err == nil {
			fmt.Println(hashed_pass)
			db.Model(&user).Where("email = ?", user.Email).Update("Password", hashed_pass)
		}
		db.Model(&user).Where("email = ?", user.Email).Update("Signincount", 0)
		c.Header("access-control-allow-origin", "*") // Why am I doing this? Find out. Try running with this line commented
		c.JSON(200, user)
	} else {
		fmt.Println("Already exits")
		c.AbortWithStatus(404)
	}
}

func Login(c *gin.Context) {
	var user User
	// Get the existing entry present in the database for the given username
	c.BindJSON(&user)
	email := user.Email
	password := user.Password

	res := db.Where("Email = ?", email).First(&user).RecordNotFound()

	if res {
		fmt.Println("User doesnt exists please register")
		c.AbortWithStatus(404)
	} else {
		// Compare the stored hashed password, with the hashed version of the password that was received
		x := User{}
		db.Where("email = ?", email).First(&x)
		fmt.Println(HashPassword(password))
		fmt.Println(x.Password)
		result := CheckPasswordHash(password, x.Password)
		if result {
			// Saved Active User ID , can use cookies here but easy hack
			activeUser = x.ID
			fmt.Println("Logged IN")
			c.Header("access-control-allow-origin", "*") // Why am I doing this? Find out. Try running with this line commented
			c.JSON(200, user)
		} else {
			fmt.Println("Incorrect password")
			c.AbortWithStatus(404)
		}
	}
}

func Result(c *gin.Context) {
	var ans []int
	var qz Quiz
	var user User
	var quiznum uint
	var quiznam string
	db.Where("id = ?", activeUser).First(&user)
	var correct Answer
	c.BindJSON(&ans)
	fmt.Println(ans[2])

	score := 0
	for i := 0; i < len(ans); i++ {
		db.Where("ques = ?", ans[i+1]).First(&correct)

		if i == 0 {
			quiznum = correct.Quiz
			// Added for True False Quiz
			if quiznum == 6 {
				score++
			}
			db.Where("id = ?", quiznum).First(&qz)
			quiznam = qz.Quizname
		}
		if correct.CorrectAns == ans[i] {
			score++
		}
		i++
	}
	db.Model(&user).Where("id = ?", activeUser).Update("Signincount", user.Signincount+1)
	fmt.Println("1")
	fmt.Println(score)
	if user.Signincount <= 3 {
		score = score * 2
	}
	fmt.Println("1")
	fmt.Println(score)
	db.Model(&user).Where("id = ?", activeUser).Update("Score", user.Score+score)
	tmp := Score{Quiznum: quiznum, Quiznam: quiznam, Usernum: activeUser, Scr: score}
	db.NewRecord(tmp)
	db.Create(&tmp)
	c.Header("access-control-allow-origin", "*") // Why am I doing this? Find out. Try running with this line commented
	c.JSON(200, score)
}

// Returns Global Leaders In Quizzing (TOP 5)
func Leaders(c *gin.Context) {
	var user []User
	if err := db.Find(&user).Error; err != nil {
		c.AbortWithStatus(404)
		fmt.Println(err)
	} else {
		c.Header("access-control-allow-origin", "*") // Why am I doing this? Find out. Try running with this line commented
		sort.Slice(user[:], func(i, j int) bool {
			return user[i].Score > user[j].Score
		})
		c.JSON(200, user[0:5])
	}
}

func GenreQuizzes(c *gin.Context) {
	var quiz []Quiz
	id := c.Params.ByName("id")
	fmt.Println("id")
	if err := db.Where("genreid = ?", id).Find(&quiz).Error; err != nil {
		fmt.Println("id")
		c.AbortWithStatus(404)
		fmt.Println(err)
	} else {
		c.Header("access-control-allow-origin", "*") // Why am I doing this? Find out. Try running with this line commented
		c.JSON(200, quiz)
	}
}

func QuizQuestions(c *gin.Context) {
	var questions []Question
	id1 := c.Params.ByName("id1")
	id2 := c.Params.ByName("id2")
	id3, _ := strconv.Atoi(id2)
	if err := db.Where("quizno = ?", id1).Find(&questions).Error; err != nil {
		c.Header("access-control-allow-origin", "*") // Why am I doing this? Find out. Try running with this line commented
		c.AbortWithStatus(404)
		fmt.Println(err)
	} else if id3 >= len(questions) {
		c.Header("access-control-allow-origin", "*") // Why am I doing this? Find out. Try running with this line commented
		c.AbortWithStatus(404)
		fmt.Println(err)
	} else {
		c.Header("access-control-allow-origin", "*") // Why am I doing this? Find out. Try running with this line commented
		c.JSON(200, questions[id3])
	}
}

func History(c *gin.Context) {
	var score []Score
	if err := db.Where("usernum = ?", activeUser).Find(&score).Error; err != nil {
		c.Header("access-control-allow-origin", "*") // Why am I doing this? Find out. Try running with this line commented
		c.AbortWithStatus(404)
		fmt.Println(err)
	} else {
		c.Header("access-control-allow-origin", "*") // Why am I doing this? Find out. Try running with this line commented
		if len(score) >= 3 {
			c.JSON(200, score[len(score)-3:len(score)])
		} else {
			c.JSON(200, score)
		}
	}
}
