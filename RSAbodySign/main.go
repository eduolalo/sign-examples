package main

import (
	"crypto"
	"crypto/rand"
	"crypto/rsa"
	"crypto/x509"
	"encoding/base64"
	"encoding/pem"
	"errors"
	"io/ioutil"
	"log"
	"os"

	"github.com/kalmecak/gosigner"
)

func main() {

	b := `|||WAKKO||||||||||||||||||||||||||||||||||`
	log.Println("Info a firmar: ", b)

	hashSum, err := gosigner.Hash256([]byte(b))
	if err != nil {

		log.Panic(err.Error())
	}

	key, err := getPkey()
	if err != nil {

		log.Panic(err.Error())
	}

	signature, err := rsa.SignPSS(rand.Reader, key, crypto.SHA256, hashSum, nil)
	if err != nil {

		log.Panic(err.Error())
	}

	encoded := base64.RawURLEncoding.EncodeToString(signature)
	log.Println("Firma RSA-PSS: ", encoded)

	Verify(encoded)
}

// Verify revisa si una firma es válida
func Verify(sign string) {

	log.Println("verificando firma")

	b := `|||WAKKO||||||||||||||||||||||||||||||||||`
	resume, err := gosigner.Hash256([]byte(b))
	if err != nil {

		log.Panic(err.Error())
	}
	bytes, err := base64.RawURLEncoding.DecodeString(sign)
	if err != nil {

		log.Panic(err.Error())
	}

	pubKey, err := getPubKey()
	if err != nil {

		log.Panic(err.Error())
	}

	if err := rsa.VerifyPSS(pubKey, crypto.SHA256, resume, bytes, nil); err != nil {

		log.Panic(err.Error())
	}

	log.Println("Firma RSA-PSS válida")
}

func getPubKey() (key *rsa.PublicKey, err error) {

	f, err := ioutil.ReadFile("./public.pem")
	if err != nil {
		return
	}

	block, _ := pem.Decode([]byte(f))
	if err != nil {
		return
	}
	if block == nil {
		err = errors.New("no se leyó el certificado")
		return
	}
	pub, err := x509.ParsePKIXPublicKey(block.Bytes)
	if err != nil {
		return
	}
	switch pub := pub.(type) {
	case *rsa.PublicKey:

		key = pub
	default:
		err = errors.New("la llave pública no es RSA")
	}
	return
}

func getPkey() (key *rsa.PrivateKey, err error) {

	f, err := os.ReadFile("./private.pem")
	if err != nil {
		return
	}

	block, _ := pem.Decode(f)
	if err != nil {
		return
	}
	key, err = x509.ParsePKCS1PrivateKey(block.Bytes)
	return
}
