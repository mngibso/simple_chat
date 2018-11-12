package config

// ConfigFile references configuration values
var ConfigFile *Config

// Config contains settings used by the app server
type Config struct {
	Port string
	StaticDir string
	Users []string
}

// init sets config values
func init() {
	c := Config{
		Port: "8080",
		StaticDir: "/static/",
	}
	ConfigFile = &c
}
