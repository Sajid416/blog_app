package model

import "time"

type Blog struct {
	ID         uint      `json:"id" gorm:"primary Key"`
	ImgUrl     string    `json:"imgUrl" gorm:"not null; column:imgUrl;size:255"`
	Category   string    `json:"category" gorm:"not null; column:category;size:255"`
	Title      string    `json:"title" gorm:"not null; column:title;size:255"`
	Details    string    `json:"details" gorm:"not null;column:details;size:1000"`
	AuthorImg  string    `json:"authorImg" gorm:"not null;column:authorImg;size:255"`
	AuthorName string    `json:"authorName" gorm:"not null;column:authorName;size:255"`
	CreatedAt  time.Time `gorm:"type:datetime;not null" json:"created_at"`
}
type User struct {
	Email    string `json:"email"`
	Password string `json:"password"`
}
