let crypto = require('crypto');

const secret = '7473fded97d74274968348b42f9433ef58e5bed5411a9924725c90b6b8b6ca0f';
let data = { "deposit_id": "C3C77926-9B30-4770-BA26-FD0FFDDEC930", "date": "2021-02-10T12:44:14.907Z" };

/**
 * Convierte un base64 estándar en base64url (RFC 4648 sección 5)
 * @param str {string} - Cadena en formato base64
 * @return str {string} - Cadena en formato base64url
 */
function base64url(str) {
    // Se reemplazan los caracteres cómo se especifica en el RFC 4648 sección 5
    str = str.replace(/\//g, '_').replace(/\+/, '-');
    // Se elimina el sigo de pad "="
    str = str.replace(/=/g, '');
    return str;
}

/**
 * Genera una firma HMAC usando el hash SHA256 de la info y llave que se le pasa
 * @param data {string} - Información para firmar
 * @param secret {string} - Cadena alfanumérica con la que se firmará la información
 */
function sign(data, secret) {
    let hmac = crypto.createHmac('sha256', secret);
    let signature = hmac.update(Buffer.from(data)).digest('base64');
    console.log(base64url(signature));
}

sign(`${data.deposit_id}${data.date}`, secret);