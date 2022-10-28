/**
 * Script para testear los tokens con la librería jose:
 * https://github.com/panva/jose
 */
const jose = require('jose');
const fs = require('fs');

const data = {
    "scp": "GET"
};

// Creación de KeyLike para el firmado
const privKey = async function() {

    // const alg = 'RS256';
    try {
        const keyContent =  fs.readFileSync('../private.pem', 'utf8');
        const key = await jose.importPKCS8(keyContent, 'RS256');
        return key;
    }catch (err) {
        console.log('No se pudo cargar la llave: ', err);
        throw err;
    }
}();
const sign = async () => {

    const now = Date.now();
    const nowPosix = Math.floor(now / 1000);
    try {
        const jwt = await new jose.SignJWT(data)
        .setSubject("/deposit/c7f1c988-92b5-48fa-9d35-2fa4f65ed4d9")
        .setProtectedHeader({ alg: 'RS256' })
        .setExpirationTime(nowPosix + 60)
        .setNotBefore(nowPosix)
        .setIssuedAt(nowPosix)
        .setIssuer("7")
        .sign(privKey);
            console.log(jwt);

    } catch (err) {
        console.log('No se pudo firmar el token: ', err);
    }
}

sign();