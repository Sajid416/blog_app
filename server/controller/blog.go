package controller

import (
	"log"
	"time"

	"github.com/Sajid416/blog_app/database"
	"github.com/Sajid416/blog_app/model"
	"github.com/gofiber/fiber/v2"
)

func BlogList(c *fiber.Ctx) error {
	context := fiber.Map{
		"StatusText": "OK",
		"Message":    "Show Blog",
	}
	time.Sleep(time.Millisecond * 500)
	db := database.DBConn
	var records []model.Blog
	db.Find(&records)
	var total int64
	db.Model(&model.Blog{}).Count(&total)
	context["blog_records"] = records
	context["total"] = total
	c.Status(200)
	return c.JSON(context)
}

func BlogDetails(c *fiber.Ctx) error {
	c.Status(400)
	context := fiber.Map{
		"StatusText": "",
		"Message":    "",
	}

	id := c.Params("id")
	var record model.Blog
	database.DBConn.First(&record, id)
	if record.ID == 0 {
		log.Println("Id not found")
		context["Message"] = "ID Not Found"
		c.Status(404)
		return c.JSON(context)
	}
	context["record"] = record
	context["StatusText"] = "OK"
	context["Message"] = "Blog Details"
	c.Status(200)
	return c.JSON(context)

}

func BlogCreate(c *fiber.Ctx) error {
	context := fiber.Map{
		"StatusText": "OK",
		"Message":    "Add Blog",
	}
	record := new(model.Blog)

	if err := c.BodyParser(&record); err != nil {
		log.Println("Error in parsing request")
		context["Message"] = "Something went wrong"
	}
	result := database.DBConn.Create(record)
	if result.Error != nil {
		log.Println("Error in saving record")
		context["Message"] = "Something went wrong"
	}
	context["Message"] = "Data is saved successfully"
	context["Data"] = record
	c.Status(200)
	return c.JSON(context)
}
func BlogUpdate(c *fiber.Ctx) error {
	context := fiber.Map{
		"StatusText": "OK",
		"Message":    "Update Blog",
	}
	id := c.Params("id")
	var record model.Blog
	database.DBConn.First(&record, id)
	if record.ID == 0 {
		log.Println("Blog id not found")
		context["Message"] = "Blog id doesnot exist"
		context["StatusText"] = ""
		c.Status(400)
		return c.JSON(context)
	}
	if err := c.BodyParser(&record); err != nil {
		log.Println("Error in parsing request!!")
		context["Message"] = "Error in Parsing Request"
		context["StatusText"] = ""
		c.Status(400)
		return c.JSON(context)
	}
	result := database.DBConn.Save(record)
	if result.Error != nil {
		log.Println("error in updating data")
		context["Message"] = "Error in updating data"
		context["StatusText"] = ""
		c.Status(400)
		return c.JSON(context)
	}
	context["Message"] = "Data updated successfully"
	context["Data"] = record

	c.Status(200)
	return c.JSON(context)
}
func BlogDelete(c *fiber.Ctx) error {
	context := fiber.Map{
		"StatusText": "OK",
		"Message":    "Delete Blog",
	}
	id := c.Params("id")
	var record model.Blog
	database.DBConn.First(&record, id)
	if record.ID == 0 {
		context["Message"] = "ID NOt Found"
		context["StatusText"] = ""
		c.Status(400)
		return c.JSON(context)
	}
	result := database.DBConn.Delete(record)
	if result.Error != nil {
		context["Message"] = "Error in deleting record"
		c.Status(400)
		return c.JSON(context)
	}
	context["Message"] = "Data deleted successfully"
	c.Status(200)
	return c.JSON(context)
}
