package config

var ConfigFile *Config

type Config struct {
	Port string
	StaticDir string
	Users []string
}

func init() {
	c := Config{
		Port: "8080",
		StaticDir: "/static/",
		Users: []string{"Ally","Benjamin","Caroline","Devac"},
	}
	ConfigFile = &c
}
