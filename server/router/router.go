package router

import (
	"github.com/Sajid416/blog_app/controller"
	"github.com/Sajid416/blog_app/middleware"
	"github.com/gofiber/fiber/v2"
)

// any function or variable should be capital letter in first letter.
func SetUpRoutes(app *fiber.App) {
	// list=> get
	// add=> post
	// update=> put
	// delete=> delete
	app.Get("/", controller.BlogList)
	app.Get("/:id", controller.BlogDetails)
	private := app.Group("/api")
	private.Use(middleware.Authenticate)
	private.Post("/", controller.BlogCreate)
	private.Get("/myblog", controller.MyBlogs)
	private.Get("/getone/:id", controller.GetOne)
	private.Post("/upload", controller.UploadImage)
	private.Put("/update/:id", controller.BlogUpdate)
	private.Delete("/myblog/:id", controller.BlogDelete)

}
