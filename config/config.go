package config

var ConfigFile *Config

type Config struct {
	Port string
}

func init() {
	c := Config{
		"8080",
	}
	ConfigFile = &c
}
