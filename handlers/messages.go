package handlers

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"net/http"
	"sort"
	"strings"

	"github.com/mngibson/simple_chat/data/transport"
)

// NewId returns an ID formed of two string arrays containing users
func NewID(u1,u2 []string) string {
	// join and sort to create a consistent id
	return strings.Join(sort.StringSlice(append(u1,u2...)),"-")
}
var storage transport.MessageStorer

// init sets up new message storage
func init() {
	storage = transport.NewCache()
}

// Messages returns the messages for a Chat
func Messages(rw http.ResponseWriter, r *http.Request) {
	fmt.Println("Messages")
	u1, ok := r.URL.Query()["u1"]
	if ok == false || len(u1) == 0 {
		http.Error(rw, "query parameters missing",  http.StatusBadRequest)
		return
	}
	u2, ok := r.URL.Query()["u2"]
	if ok == false || len(u2) == 0 {
		http.Error(rw, "query parameters missing",  http.StatusBadRequest)
		return
	}
	//fmt.Println("Get Messages", u1, u2)
	// Query storage
	chat,err := storage.Get(NewID(u1,u2))
	if err != nil {
		http.Error(rw, err.Error(), http.StatusInternalServerError)
		return
	}

	// Get and marshall just the text of the message
	out := []string{}
	for _,m := range chat.Messages {
		out = append(out,m.Text)
	}
	data, err := json.Marshal(out)
	if err != nil {
		http.Error(rw, err.Error(), http.StatusInternalServerError)
		return
	}

	rw.WriteHeader(http.StatusOK)
	rw.Header().Set("Content-Type", "application/json")
	rw.Write(data)
}

type postBody struct {
	U1 string `json:"u1"`
	U2 string `json:"u2"`
	Message string `json:"message"`
}
// SetMessages adds a message to a chat
func SetMessages(rw http.ResponseWriter, r *http.Request) {
	fmt.Println("SetMessages")
	//r.ParseForm()
	fmt.Println(r.URL.Query())

	fmt.Println(r.Form)
	message := postBody{}
	// Get the body
	b, err := ioutil.ReadAll(r.Body); if err != nil {
		http.Error(rw, err.Error(), http.StatusInternalServerError)
		return
	}

	fmt.Println(string(b))
	// Unmarshall body into string map
	err = json.Unmarshal(b, &message); if err != nil {
		fmt.Println("could not unmarshall post body")
		fmt.Println(err)
		fmt.Println(message)
		http.Error(rw, err.Error(), http.StatusInternalServerError)
		return
	}

	// Add the message to storage
	err = storage.Add(NewID([]string{message.U1},[]string{message.U2}),message.Message)
	if err != nil {
		fmt.Println("storage.Add failed")
		http.Error(rw, err.Error(), http.StatusInternalServerError)
		return
	}

	rw.WriteHeader(http.StatusCreated)
	rw.Header().Set("Content-Type", "application/json")
}
