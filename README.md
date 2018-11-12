# simple_chat

# Description

Simple Chat is an impractical chat application written in Go and Knockout.JS with hard-coded users.

## Prerequisites
- [Go](https://golang.org/dl/)

Install and set up your go environment.  You will need to add `go/bin` directory to your PATH. Create your workspace directory, $HOME/go. (If you'd like to use a different directory, you will need to set the GOPATH environment variable.)


## Get simple_chat

The following command will donwload `simple_chat` and install it in `$GOPATH/src/github.com/mngibson`:

`$ go get github.com/mngibson/simple_chat`

## Start simple_chat

```
$ go run $GOPATH/src/github.com/mngibson/simple_chat/main.go
 Server starting on port: 8080
```
## Use simple_chat

Go to http://localhost:8080 in two or more browser tabs.  Choose a name under "Who are you?" to signify what name you'll be sending messges under.  Chose a name under "Who are you chatting with?" to signify who you will be sending messages to.  Use the "Send" button and text input to send messages.

## Design Notes

simple_chat uses [Knockout](https://knockoutjs.com/) for simple reactivity, [Bootstrap](https://getbootstrap.com/) for layout and css on the frontend.  The backend is written in Go and uses [Gorilla Mux](https://github.com/gorilla/mux) for routing.

Messages are stored using [go-cache](https://github.com/patrickmn/go-cache), an in-memory key:value store similar to Memcached.  Messages will not be preserved between server starts.
