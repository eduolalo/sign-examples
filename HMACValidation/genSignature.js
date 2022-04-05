/*
* Para este ejemplo se usa la versión v15.12.0 de NodeJS
*/

const crypto = require('crypto');

const secret = '7473fded97d74274968348b42f9433ef58e5bed5411a9924725c90b6b8b6ca0f';
const data = '{"institucionBeneficiaria": 90646,"tipoCuentaBeneficiario": 3,"institucionOrdenante": 40072,"tipoCuentaOrdenante": 3,"rfcCurpBeneficiario": "ROCC881103CN7","cuentaBeneficiario": "646180251901000193","referenciaNumerica": 220311,"nombreBeneficiario": "CHRISTIAN E RODRIGUEZ","rfcCurpOrdenante": "ROCC881103CN7","nombreOrdenante": "CHRISTIAN EDUARDO RODRIGUEZ CISNEROS","cuentaOrdenante": "072180008640451312","fechaOperacion": "20220311","claveRastreo": "3843CP05202203111636732938","conceptoPago": "Test walabi","empresa": "WAKKO","monto": 10.00,"clave": 216496}';
// const data = '{"institucionBeneficiaria": 90646,"tipoCuentaBeneficiario": 3,"institucionOrdenante": 40072,"tipoCuentaOrdenante": 3,"rfcCurpBeneficiario": "MABA8904153C5","cuentaBeneficiario": "646180251903000052","referenciaNumerica": 220311,"nombreBeneficiario": "Anuar Maruri","rfcCurpOrdenante": "ROCC881103CN7","nombreOrdenante": "CHRISTIAN EDUARDO RODRIGUEZ CISNEROS","cuentaOrdenante": "072180008640451312","fechaOperacion": "20220311","claveRastreo": "3843CP05202203111636732938","conceptoPago": "Test walabi","empresa": "WAKKO","monto": 100.00,"clave": 226481}';
/**
 * Convierte un base64 estándar en base64url (RFC 4648 sección 5)
 * @param str {string} - Cadena en formato base64
 * @return str {string} - Cadena en formato base64url
 */
function base64url(str) {
    // Se reemplazan los caracteres cómo se especifica en el RFC 4648 sección 5
    str = str.replace(/\//g, '_').replace(/\+/g, '-');
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

sign(data, secret);