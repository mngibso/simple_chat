package main

import (
	"log"
	"net/http"

	"github.com/gorilla/mux"

	"github.com/mngibson/simple_chat/config"
	"github.com/mngibson/simple_chat/handlers"
)

func main() {
	r := mux.NewRouter()
	r.HandleFunc("/", handlers.Home)
	// r.HandleFunc("/products", ProductsHandler)
	// r.HandleFunc("/articles", ArticlesHandler)
	http.Handle("/", r)
	log.Println("Server starting on port:", config.ConfigFile.Port)
	log.Fatal(http.ListenAndServe(":"+config.ConfigFile.Port, r))

}
