package main

import (
	"fmt"
	"net/http"

	// Why do we need this package? Anyway Not Needed

	"github.com/jinzhu/gorm"
	_ "github.com/jinzhu/gorm/dialects/sqlite"
	_ "github.com/mattn/go-sqlite3"
	"github.com/qor/admin"
)

var db *gorm.DB
var err error

type User struct {
	ID       uint   `json:"id"` //if provided then that id else autoincrement
	Name     string `json:"name"`
	Email    string `json:"email"`
	Password string `json:"password"`
	Score    int    `json:"score"`
	Admin    bool   `json:"admin"`
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

func main() {
	db, err = gorm.Open("sqlite3", "../src/quiz.db")
	if err != nil {
		fmt.Println(err)
	}

	defer db.Close()

	db.AutoMigrate(&User{}, &Genre{}, &Question{}, &Quiz{}, &Score{}, &Answer{})

	// r := gin.Default()

	Admin := admin.New(&admin.AdminConfig{DB: db})

	// Allow to use Admin to manage User, Product
	Admin.AddResource(&User{})
	Admin.AddResource(&Question{})
	Admin.AddResource(&Quiz{})
	Admin.AddResource(&Answer{})

	// initalize an HTTP request multiplexer
	mux := http.NewServeMux()

	// Mount admin interface to mux
	Admin.MountTo("/admin", mux)

	fmt.Println("Listening on: 9000")
	http.ListenAndServe(":9000", mux)

	//////////////////////////////////////////////////////////////////////
}
