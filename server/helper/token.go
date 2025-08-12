package helper

import (
	"log"
	"net/http"
	"time"

	"github.com/Sajid416/blog_app/model"
	"github.com/gofiber/fiber/v2"
	"github.com/golang-jwt/jwt/v5"
)

// CustomClaims includes ID and Email in JWT claims.
type CustomClaims struct {
	ID    uint   `json:"id"`
	Email string `json:"email"`
	jwt.RegisteredClaims
}

var secret string = "secret"

// GenerateToken generates a JWT token with ID and Email in claims
func GenerateToken(user model.User) (string, error) {
	claims := CustomClaims{
		ID:    user.ID,
		Email: user.Email,
		RegisteredClaims: jwt.RegisteredClaims{
			ExpiresAt: jwt.NewNumericDate(time.Now().Add(time.Hour * 24 * 3)), // 3 days expiry
			IssuedAt:  jwt.NewNumericDate(time.Now()),
			Issuer:    "blog_app",
		},
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)

	t, err := token.SignedString([]byte(secret))
	if err != nil {
		log.Println("Error in token signing:", err)
		return "", err
	}

	return t, nil
}

// ValidateToken parses and validates the JWT token string.
// If invalid, returns a 401 response directly (Fiber style).
func ValidateToken(c *fiber.Ctx, clientToken string) (*CustomClaims, error) {
	token, err := jwt.ParseWithClaims(clientToken, &CustomClaims{}, func(token *jwt.Token) (interface{}, error) {
		return []byte(secret), nil
	})

	if err != nil {
		c.Status(http.StatusUnauthorized).JSON(fiber.Map{
			"error": "Invalid or expired token",
		})
		return nil, err
	}

	claims, ok := token.Claims.(*CustomClaims)
	if !ok || !token.Valid {
		c.Status(http.StatusUnauthorized).JSON(fiber.Map{
			"error": "Invalid token claims or token expired",
		})
		return nil, fiber.ErrUnauthorized
	}

	return claims, nil
}
