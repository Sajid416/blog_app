package middleware

import (
	"strings"

	"github.com/Sajid416/blog_app/helper"
	"github.com/gofiber/fiber/v2"
)

func Authenticate(c *fiber.Ctx) error {
	authHeader := c.Get("Authorization")
	if authHeader == "" {
		return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{
			"error": "Missing Authorization header",
		})
	}

	// Remove "Bearer " prefix
	token := strings.TrimPrefix(authHeader, "Bearer ")

	// Validate token (this will also send 401 if invalid)
	claims, err := helper.ValidateToken(c, token)
	if err != nil {
		return nil // response already sent in ValidateToken
	}

	c.Locals("userEmail", claims.Email)
	return c.Next()
}
