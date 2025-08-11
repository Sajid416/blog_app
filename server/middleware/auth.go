package middleware

import (
	"log"
	"strings"

	"github.com/Sajid416/blog_app/helper"
	"github.com/gofiber/fiber/v2"
)

func Authenticate(c *fiber.Ctx) error {
	// Get token from Authorization header (prefer "Bearer <token>" pattern)
	authHeader := c.Get("Authorization")
	if authHeader == "" {
		return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{"error": "Token not present."})
	}

	parts := strings.Split(authHeader, " ")
	if len(parts) != 2 || parts[0] != "Bearer" {
		return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{"error": "Invalid token format"})
	}
	token := parts[1]

	claims, msg := helper.ValidateToken(token)
	log.Println(claims)

	if msg != "" {
		return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{"error": msg})
	}

	// optionally set claims data in locals for downstream handlers
	c.Locals("userEmail", claims.Email)
	c.Locals("userPassword", claims.Password)

	return c.Next()
}
