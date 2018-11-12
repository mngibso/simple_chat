package transport

import (
	"errors"
	"fmt"
	"time"

	"github.com/patrickmn/go-cache"

	"github.com/mngibson/simple_chat/data/schemas"
)

// MessageStorer declares the interface used to store chat messages
type MessageStorer interface {
	Get(ID string) (*schemas.Chat, error)
	Add(ID, schemas string) error
	Delete(ID, message string) error
}

// NewCache initializes a Cache object with an underlying implementation
func NewCache() *Cache {
	// use the memdb
	c := cache.New(30*time.Minute, 60*time.Minute)
	return &Cache{
		c,
	}
}

// Cache implements a MessageStorer
type Cache struct {
	DB *cache.Cache
}

// Get the messages from teh chat identified by ID
func (s *Cache) Get(ID string) (*schemas.Chat, error) {
	fmt.Println("GET", ID)
	i, found := s.DB.Get(ID)

	// Not found?  just return an empty chat
	if found == false {
		return schemas.NewChat(ID), nil
	}

	// Make sure a chat is stored
	out, ok := i.(*schemas.Chat)
	// If it's not a chat, throw error
	if ok == false {
		return nil, errors.New("stored object is not a Chat")
	}
	return out, nil
}

// Add the message to the chat identified by ID
func (s *Cache) Add(ID string, message string) error {
	fmt.Println("Add", ID)
	chat, err := s.Get(ID)
	if err != nil {
		return err
	}

	// create the message
	m := schemas.NewMessage(message)
	// Append it to the chat object
	chat.Messages = append(chat.Messages, m)
	// Save teh chat object
	s.DB.Set(ID, chat, cache.DefaultExpiration)
	return nil
}

// Delete the given message with the given chat ID
// ToDo: implement,  need unique message ID
func (s *Cache) Delete(ID, message string) error {
	return errors.New("not implemented")
}
