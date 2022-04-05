/*
* Para este ejemplo se usa la versión 1.16 de Golang
*/


package main

import (
	"crypto/hmac"
	"crypto/sha256"
	"encoding/base64"
	"flag"
	"log"
)

var data = `{"rfc":"xxxxxxxxxxxxxxxxxx","nombre":"Leonardo","cdc":"01"}`
var key = "7473fded97d74274968348b42f9433ef58e5bed5411a9924725c90b6b8b6ca0f"

func main() {

	signature := flag.String("s", "", "Firma a validar")
	flag.Parse()

	if *signature == "" {

		log.Panicln("Sin firma para validar")
	}

	// Generamos la firma
	mac := hmac.New(sha256.New, []byte(key))
	mac.Write([]byte(data))
	generated := base64.RawURLEncoding.EncodeToString(mac.Sum(nil))

	log.Println("Firma recibida: ", *signature)
	log.Println("Firma generada: ", generated)
	equal := hmac.Equal([]byte(generated), []byte(*signature))
	log.Println("Las firmas coinciden: ", equal)
}
