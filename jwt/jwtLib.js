/**
 * Scrip para ejemplo con la librería jsonwebtoken
 */

const jwt = require('jsonwebtoken');
const fs = require('fs');

/**
 * Función para generar el payload
 * @returns Buffer
 */
const payload = function (depositID){

    Math.round(Date.now() / 1000)
    const now = new Date;
    const nbf = Math.round(now.getTime() / 1000);
    const exp = Math.round(now.getTime() / 1000) + 5;
    pl = JSON.stringify({
        "sub": `/deposit/${depositID}`,
        "scp": "GET",
        "exp": exp,
        "nbf": nbf,
        "iat": nbf,
        "iss": "2" // <- Cambia por tu clientID
    });
    return Buffer.from(pl, "utf-8");
};

/**
 * 
 * @returns string JWT degenerado
 */
function singjwt(depositID){

    const privateKey = fs.readFileSync('../private.pem');
    const token = jwt.sign(payload(depositID), privateKey, { algorithm: 'RS256' });
    return token;
}

module.exports = singjwt;
