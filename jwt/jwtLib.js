/**
 * Scrip para ejemplo con la librería jsonwebtoken
 */

const jwt = require('jsonwebtoken');
const fs = require('fs');


const payload = function (){


    const now = new Date;
    const nbf = now.getTime();
    pl = JSON.stringify({
        "sub": "/deposit/c7f1c988-92b5-48fa-9d35-2fa4f65ed4d9",
        "scp": "GET",
        "exp": now.getTime() + 5,
        "nbf": nbf,
        "iat": nbf,
        "iss": "7"
    });
    return Buffer.from(pl, "utf-8");
};

function singjwt(){

    const privateKey = fs.readFileSync('../private.pem');
    const token = jwt.sign(payload(), privateKey, { algorithm: 'RS256' });
    return token;
}

module.exports = singjwt;
