package main

import (
	"crypto"
	"crypto/rand"
	"crypto/rsa"
	"crypto/sha256"
	"encoding/base64"
	"log"

	"github.com/kalmecak/gosigner"
)

func main() {

	s := `|||||||||||||||||||||||||||||||||||||`
	msjHash := sha256.New()
	if _, err := msjHash.Write([]byte(s)); err != nil {

		log.Println(err.Error())
	}

	f := `-----BEGIN RSA PRIVATE KEY-----
	MIIEpAIBAAKCAQEA2FOdYTRk5KPdmdFdakzhqpXDeDRbLpsfeKKqJuFJUvcyYp0M
	wk7hDRZ8hxS3eibjJG6mT4ntPsbvUx/BqFqTWSZ/ymLMWsUpdbYAqHVG+W1xAifm
	XOfQMwvEQiImQoUiHl+BqcaD6rXw2oh5xLatl6lHyZvjc6c+HBEBT0m1Pb5lcis/
	SzcnmVpG4ASRDswV115ab9u3M2wMLhBVDTE2Wtp264rKVoY6MC0/Gcsq0cL9RUW1
	ebkw4RxRQNSBd3QH0CTDkFukKEFwpOquE2xT6Pk/wRmQLfBPGZI+1R+fqODPMALa
	MfXoDWiyUff5sTmiDOuskkIgQ4avYcmFNoqpcQIDAQABAoIBAAXx3kxSjUc/PZLB
	jyihrj3q2bFO9waD2syM49IntMUj5+2P1U7trf+XE5r+tcAUm39fzxA2gR+Nhfwp
	zj+bJZt4lGBycJ0599a1RrVaa7XlDQr7H7iD4lPUyfLrT1PapsJg64ZH304u68yF
	nZsLTh/x1fgzYX/HI8zPptKP+vwUV2sEHBzI6rbYHL0YLGqDT8Ln4svGKIGFAY8h
	AcrqYnXg3zkHcl0QfsV91VuDZ2qQHVrN/jOm7KZ98Ih1UpmwXkwCrSWXo9WfJ1VA
	dqfottsaE5zbJ9IJPUl7CGYFhdHXaCFpTP58VYEduvJUuSudlbJ844WuM/gBTTtc
	Frj1c0ECgYEA/YTODdcJG/O+TJDqYdKnNG7CRuxTAMGSr73YT52iOltGgMSN7eDJ
	ci9KpuswUeNwzL7lMvsMK2YJdEwls/A7y/XAbOljrikphyqS2qc+4XD8aqiT/HP9
	owVqFpU20r0eX4wDrQ2TsknFiUTR+1gGnEId+bPr18jN7+jNS2MkM8kCgYEA2nGf
	1xDRTBJfoE2NGxhc2JCaIOxxOCALPgAhJbaa3va3xGqNgdeNVCiZaYKA2F34XeFM
	m9jG2TcLnDlbyGjOMmr0l25tBrtvVijshVU9Zo4HiKHdd7Jn5PnQnTnO8/VkoCMn
	WGJPu5ljL92TzIzVBX9iYQ4i4IsHmpBATQIkDGkCgYEAjYXapV06Z5E81W88eFlp
	H9sItyDsAQsOgO7A10kPK/aSOAYBmR6YNhbyXJYERmJqMNIMDtaYZ42xj2uGzJk6
	OFS7E9GB5NJzrVH14vvkHWO+dSggXJi/qYa3P14S2bfbQcler/dZUPjfvg5eDiqI
	nihGpYNsD+y4Ecpq+D+jEQkCgYEAjJJeKAo8hdW1D/WX/n25EexMIy/E1DdaxLVU
	n25ZT245Z/6hvZK28heGUe2XeKVQNSnNIOVpYVMY95m5xMgdGTjW2bRIGPL5fNqt
	CkiGUL7JflWbrXFzhlh0tRkEYt3huWOl6Cyr3q+gsqbGe/WNCBKnfomYTCNr6z01
	A9mC1TECgYAP1lX1TZfbMb8K0JZ0vC/VT4lAndliaFl+ZUsMCxrWnZm8YZucYOB8
	lwZBvehuc7jxg+LFY4O6ccbj9J3Va23osRoEHMG+p3O3RMNDf4Tr9vhj6Qu4ZNm3
	QjM1Ug1yr7iqTRCWk577U5I3vYB4k2Z8IAGCc+WUQu3JF0iIgqLLKw==
	-----END RSA PRIVATE KEY-----
`
	key, err := gosigner.RSAPrivKey([]byte(f))
	if err != nil {

		log.Println(err.Error())
		return
	}

	signature, err := rsa.SignPKCS1v15(rand.Reader, &key, crypto.SHA256, msjHash.Sum(nil))
	if err != nil {

		log.Println(err.Error())
		return
	}
	log.Println(base64.StdEncoding.EncodeToString(signature))
}
