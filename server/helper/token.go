package helper

import (
	"log"
	"time"

	"github.com/Sajid416/blog_app/model"
	"github.com/golang-jwt/jwt/v5"
)

// CustomClaims includes Email and Password in JWT claims.
// NOTE: Usually you shouldn't put password in token claims for security reasons.
type CustomClaims struct {
	Email    string
	Password string
	jwt.RegisteredClaims
}

var secret string = "secret"

// GenerateToken generates a JWT token with Email and Password in claims
func GenerateToken(user model.User) (string, error) {
	claims := CustomClaims{
		Email:    user.Email,
		Password: user.Password, // include password in token claims (not recommended in practice)
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

// ValidateToken parses and validates the JWT token string,
// returning CustomClaims if valid, or error message if not.
func ValidateToken(clientToken string) (*CustomClaims, string) {
	token, err := jwt.ParseWithClaims(clientToken, &CustomClaims{}, func(token *jwt.Token) (interface{}, error) {
		return []byte(secret), nil
	})

	if err != nil {
		return nil, err.Error()
	}

	claims, ok := token.Claims.(*CustomClaims)
	if !ok || !token.Valid {
		return nil, "Invalid token claims or token expired"
	}

	return claims, ""
}
