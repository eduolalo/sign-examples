# Ejemplos de firmas

Este repo contiene ejemplos de como generar firmas y JWT's y tiene por objetivo dar una idea a los desarrolladores cómo se pueden generar.

## Certificados

Los certificados privados y públicos que están en este repo fueron creados específicamente para los ejemplos,
no debes usarlos para tus proyectos.

## Lenguajes

Para estos ejemplos se necesita como mínimo

* Go v1.17+
* NodeJS 17+

## Como ejecutarlos?

Clona el repo en la dirección de tu máquina y entra a la carpeta generada.

### Comparación de firmas HMAC

El propósito de este código es verificar que usuando diferentes lenguajes se puede llegar al mismo HASH.

```
$ go run HMACbodySign/main.go && node HMACbodySign/BodySignature.js
```
Esto dará como resultado:
```
Firma Go:  -YLgyM_G0CE2lyJzS8Hf_h54YgeeiJncvzBg00LJMwQ
Firma Node:  -YLgyM_G0CE2lyJzS8Hf_h54YgeeiJncvzBg00LJMwQ
```

### Creación de JWT

Se prentende ejemplificar la creación de un jwt con el algoritmo RS256 para validación asimétrica, siéntete libre de entrar a https://jwt.io/ y validar los tokens que generes. recuerda usar los certificados de este repo.

```
go run jwt/main.go -iss="7" -sub="/user/3E4401CF-AD00-40D3-9065-94EE0C34A259" -scp="GET"
```
El resultado será algo parecido:
```
JWT:  eyJhbGciOiJSUzI1NiJ9.eyJleHAiOjE2MTMwODc1MTcsImlhdCI6MTYxMzA4NzM5NywiaXNzIjoiNyIsIm5iZiI6MTYxMzA4NzM5Nywic2NwIjoiR0VUIiwic3ViIjoiL3VzZXIvM0U0NDAxQ0YtQUQwMC00MEQzLTkwNjUtOTRFRTBDMzRBMjU5In0.gir9qw9dVzkUQTg1mp0MnyY9WBgDehQ4mVH4v_SE07X8gomC42ujKnwWs4Er_Rue6zcGP2Kqmxpok_K3Nd3dRZrJ2oaQr9bDCUzkTMxWrabVlQlt-mzqYDee2uqE7iUJt57XndGBdKLT880CvGr60_oYyerT3SVU8f53KAsjjIaZe1ViARy-_8Jiw_t6hQhGOlRszI3QSmJ6ZNxRX6SYx0hu5cEk_v4tSZpjJeoVzrHo5hKyeCD10w_BDESadYX_a_bHn71OFjj-LXT8qOzagAb4U050VRiC1lRc1j2AIS-1XZ21PHVgspTPk9gy7j8xAmWYlT8B2nMeMaCUqy6YNg

Payload:  {"exp":1613087517,"iat":1613087397,"iss":"7","nbf":1613087397,"scp":"GET","sub":"/user/3E4401CF-AD00-40D3-9065-94EE0C34A259"}
```
### Firma con el método RSA-PSS

Se pretende ejemplificar la firma RSA-PSS para la validación asimétrica
```
go run RSAbodySign/main.go
```
Deberá darte algo similar a:
```
Info a firmar:  {"rfc":"exexexexexex","nombre":"utt"}
Firma RSA-PSS:  YPY_OyCNmY-Mihp0jtA028WIzYSisX0eaK8T-B0Pbrg1JVyy-FJ5-O9sDWUM_651ITkpSA0GkM0hbXKMruVe3ZxHSJoDEwhVKNmYLdHp76HH3Qf4OCF75G8hC5W_5Zv-4trrmnrji04737jWI8Lpj9RSHBDZYoH8GcN2PnDCpu5nDm3rCDXpgk9s5bVcNcA_YkgwPnNiRsNgTb54PYzUoAWumISZTUM-GRh9yRdIDy90mZ0ImRDpLZI5lMbwJVb07_WULMNqyszkNB6cgBt3vAf1DyAwLEiteY2rrftyVKs3moBO036faE6QYhxvWfnXzCik9SKsPNbsicW_DfeapQ
verificando firma
Firma RSA-PSS válida
```
