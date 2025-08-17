package controller

import (
	"fmt"
	"log"
	"os"
	"path/filepath"
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
func MyBlogs(c *fiber.Ctx) error {
	userID := c.Locals("userId").(string)
	fmt.Println("UserID from middleware:", userID)
	var blogs []model.Blog
	result := database.DBConn.Where("author_id = ?", userID).Find(&blogs)
	if result.Error != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": "Database error"})
	}

	return c.JSON(blogs)
}

func GetOne(c *fiber.Ctx) error {
	id := c.Params("id")
	var record model.Blog
	database.DBConn.First(&record, id)
	if record.ID == 0 {
		return c.Status(404).JSON(fiber.Map{"Error": "Blog not found"})
	}
	return c.Status(200).JSON(record)
}

func SearchBlog(c *fiber.Ctx) error {
	query := c.Query("title")
	var blogs []model.Blog
	if err := database.DBConn.Where("title LIKE ?", "%"+query+"%").Find(&blogs).Limit(5).Error; err != nil {
		return c.Status(500).JSON(fiber.Map{"Error": "Error in fatching blog"})
	}
	return c.JSON(blogs)

}

func BlogCreate(c *fiber.Ctx) error {
	var blog model.Blog

	if err := c.BodyParser(&blog); err != nil {
		return c.Status(400).JSON(fiber.Map{"error": err.Error()})
	}
	fmt.Println(blog)
	// এখানে authorId token থেকে নেবো, ফর্ম ডাটা থেকে না
	authorID := c.Locals("userId") // middleware.Authenticate এ সেট করা হয়েছে
	blog.AuthorID = authorID.(string)
	fmt.Println(authorID)
	if err := database.DBConn.Create(&blog).Error; err != nil {
		return c.Status(500).JSON(fiber.Map{"error": err.Error()})
	}

	return c.Status(201).JSON(blog)
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

func UploadImage(c *fiber.Ctx) error {
	file, err := c.FormFile("image")
	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": "No file uploaded",
		})
	}

	// Ensure uploads folder exists
	if _, err := os.Stat("./uploads"); os.IsNotExist(err) {
		os.Mkdir("./uploads", os.ModePerm)
	}

	// Create unique filename
	fileExt := filepath.Ext(file.Filename)
	newFileName := fmt.Sprintf("%d%s", time.Now().UnixNano(), fileExt)
	filePath := filepath.Join("./uploads", newFileName)

	if err := c.SaveFile(file, filePath); err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error": "Unable to save file",
		})
	}

	// Public URL for the saved file
	fileURL := fmt.Sprintf("http://localhost:8080/uploads/%s", newFileName)
	return c.JSON(fiber.Map{
		"url": fileURL,
	})
}
