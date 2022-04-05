package main

import (
	"crypto/rsa"
	"crypto/x509"
	"encoding/pem"
	"errors"
	"flag"
	"io/ioutil"
	"log"
	"time"

	"github.com/pascaldekloe/jwt"
)

func main() {

	pid := flag.Int("pid", 0, "Id del producto")
	ref := flag.String("ref", "", "referencia de la venta")
	amt := flag.Float64("amt", 0.0, "Monto de la venta")
	qty := flag.Float64("qty", 0.0, "Cantidad del producto")
	flag.Parse()
	token := createToken(pid, ref, amt, qty)
	log.Println("JWT: ", token)
	validateToken(token)
}

func createToken(pid *int, ref *string, amt, qty *float64) string {

	var claims jwt.Claims

	claims.Set = map[string]interface{}{
		"pid": pid,
		"ref": ref,
		"amt": amt,
		"qty": qty,
	}

	then := time.Now()
	claims.NotBefore = jwt.NewNumericTime(then.Round(time.Second))
	claims.Issued = claims.NotBefore
	now := time.Now().Add(120 * time.Second)
	claims.Expires = jwt.NewNumericTime(now.Round(time.Second))

	key, err := getPkey()
	if err != nil {
		log.Panic(err.Error())
	}
	t, err := claims.RSASign(jwt.RS256, key)
	return string(t)
}

func getPkey() (key *rsa.PrivateKey, err error) {

	f, err := ioutil.ReadFile("./private.pem")
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

func validateToken(token string) {

	key, err := getPubKey()
	if err != nil {
		log.Println(err.Error())
		return
	}

	claims, err := jwt.RSACheck([]byte(token), key)
	if err != nil {
		log.Printf("Error en el token: %s", err.Error())
		return
	}

	log.Println("Payload: ", string(claims.Raw))

	if !claims.Valid(time.Now()) {
		log.Printf("Tiempo excedido")
		return
	}

	log.Println("Token Válido.")
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
		err = errors.New("No se leyó el certificado")
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
		err = errors.New("La llave pública no es RSA")
	}
	return
}
