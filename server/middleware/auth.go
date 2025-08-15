package middleware

import (
	"log"
	"strings"

	"github.com/Sajid416/blog_app/helper"
	"github.com/gofiber/fiber/v2"
)

// Authenticate middleware checks JWT token from Authorization header
func Authenticate(c *fiber.Ctx) error {
	// Get token from Authorization header
	token := c.Get("Authorization")
	if token == "" {
		return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{
			"error": "Token not found",
		})
	}

	// Remove "Bearer " prefix if present
	if strings.HasPrefix(token, "Bearer ") {
		token = strings.TrimPrefix(token, "Bearer ")
		token = strings.TrimSpace(token) // optional: remove extra spaces
	}

	// Validate the token
	claims, err := helper.ValidateToken(token)
	if err != nil {
		log.Println("Invalid token:", err)
		return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{
			"error": "Invalid token",
		})
	}

	// Log info for debugging
	log.Println("Authenticate middleware called")
	log.Println("Claims:", claims.UserID, claims.Email)

	// Store user info in context for future handlers
	c.Locals("userId", claims.UserID)
	c.Locals("email", claims.Email)

	// Continue to next middleware/handler
	return c.Next()
}
