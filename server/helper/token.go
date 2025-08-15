package helper

import (
	"errors"
	"fmt"
	"log"
	"os"
	"time"

	"github.com/golang-jwt/jwt/v5"
	"github.com/joho/godotenv"
)

type CustomClaims struct {
	Email  string `json:"email"`
	UserID string `json:"userId"`
	jwt.RegisteredClaims
}

var secret string

func init() {
	err := godotenv.Load()
	if err != nil {
		log.Fatal("Error loading .env file")
	}
	secret = os.Getenv("JWT_SECRET") // assign once when package loads
}

// GenerateToken নতুন token তৈরি করবে
func GenerateToken(email, userId string) (string, error) {
	claims := CustomClaims{
		Email:  email,
		UserID: userId,
		RegisteredClaims: jwt.RegisteredClaims{
			ExpiresAt: jwt.NewNumericDate(time.Now().Add(time.Hour * 72)), // ৩ দিন মেয়াদ
			IssuedAt:  jwt.NewNumericDate(time.Now()),
		},
	}
	fmt.Println("Generating token for:", email, userId)

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	return token.SignedString([]byte(secret))
}

// ValidateToken token verify করবে
func ValidateToken(tokenString string) (*CustomClaims, error) {
	if tokenString == "" {
		return nil, errors.New("token is empty")
	}

	// Parse token with claims
	token, err := jwt.ParseWithClaims(tokenString, &CustomClaims{}, func(token *jwt.Token) (interface{}, error) {
		return []byte(secret), nil
	})
	if err != nil {
		return nil, err
	}

	claims, ok := token.Claims.(*CustomClaims)
	if !ok || !token.Valid {
		return nil, errors.New("invalid token claims")
	}

	fmt.Println("Token validated. Claims:", claims.UserID, claims.Email)
	return claims, nil
}
