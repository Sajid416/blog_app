package main

import (
	"log"

	"github.com/Sajid416/blog_app/database"
	"github.com/Sajid416/blog_app/router"
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"github.com/joho/godotenv"
)

func init() {
	if err := godotenv.Load(".env"); err != nil {
		log.Fatal("error in loading .env file")
	}
	database.ConnectDB()
}

func main() {
	sqlDB, err := database.DBConn.DB()
	if err != nil {
		panic("Error in sql connection")
	}
	defer sqlDB.Close()
	app := fiber.New()
	app.Static("/uploads", "./uploads")
	app.Use(cors.New(cors.Config{
		AllowOrigins: "https://blog-deploy-k4g36s963-sajid416s-projects.vercel.app",
		AllowMethods: "GET,POST,PUT,DELETE,OPTIONS",
		AllowHeaders: "Origin, Content-Type, Accept,Authorization",
	}))
	router.SetUpRoutes(app)
	app.Listen(":8080")

}
