package main

import (
	"github.com/mngibson/simple_chat/handlers"
	"log"
	"net/http"

	"github.com/gorilla/mux"

	"github.com/mngibson/simple_chat/config"
)

func main() {
	r := mux.NewRouter()
	r.HandleFunc("/api/messages", handlers.Messages).Methods("GET")
	r.HandleFunc("/api/messages", handlers.SetMessages).Methods("POST")
	// r.HandleFunc("/products", ProductsHandler)
	// r.HandleFunc("/articles", ArticlesHandler)
	//http.Handle("/", r)
	r.PathPrefix("/").Handler(http.FileServer(http.Dir("./static/")))

	//http.HandleFunc("/ws", handlers.handleWsConnections)
	s := http.StripPrefix("/static/", http.FileServer(http.Dir("./static/")))
	r.PathPrefix("/static/").Handler(s)
	http.Handle("/", r)
	log.Println("Server starting on port:", config.ConfigFile.Port)
	log.Fatal(http.ListenAndServe(":"+config.ConfigFile.Port, nil))

}
func xmain() {
	router := NewRouter()
	err := http.ListenAndServe(":"+config.ConfigFile.Port, router)
	if err != nil {
		log.Fatal("ListenAndServe Error: ", err)
	}
}

func NewRouter() *mux.Router {
	router := mux.NewRouter().StrictSlash(true)

	// Server CSS, JS & Images Statically.
	router.
		PathPrefix(config.ConfigFile.StaticDir).
		Handler(http.StripPrefix(config.ConfigFile.StaticDir, http.FileServer(http.Dir("."+config.ConfigFile.StaticDir))))

	return router
}
