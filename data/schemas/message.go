// package schemas contains common structs for simple chat
package schemas

import "time"

// Return a pointer to an intialized message.  Set Created date.
func NewMessage(m string) *Message {
	now := time.Now()
	return &Message{
		m,
		now,
	}
}

// Message contains data for a chat message
type Message struct {
	Text    string
	Created time.Time
}

// NewChate return a pointer to an initialized Chat object
func NewChat(ID string) *Chat {
	return &Chat{
		ID,
		[]*Message{},
	}
}

// Chat contains an array of messages
type Chat struct {
	ID       string
	Messages []*Message
}
