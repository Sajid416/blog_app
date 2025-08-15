package database

import (
	"log"
	"os"

	"github.com/Sajid416/blog_app/model"
	"gorm.io/driver/mysql"
	"gorm.io/gorm"
	"gorm.io/gorm/logger"
)

var DBConn *gorm.DB

func ConnectDB() {

	dsn := os.Getenv("DSN")

	db, err := gorm.Open(mysql.Open(dsn), &gorm.Config{Logger: logger.Default.LogMode(logger.Error)})
	if err != nil {
		log.Fatalf("Database connection failed: %v", err)
	}
	log.Println("Database Connection Successful")
	db.AutoMigrate(new(model.Blog))
	DBConn = db
}
