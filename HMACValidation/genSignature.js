/*
* Para este ejemplo se usa la versión v15.12.0 de NodeJS
*/

const crypto = require('crypto');

const secret = '7473fded97d74274968348b42f9433ef58e5bed5411a9924725c90b6b8b6ca0f';
const data = '{"institucionBeneficiaria":90646,"tipoCuentaBeneficiario":3,"institucionOrdenante":40072,"tipoCuentaOrdenante":3,"rfcCurpBeneficiario":"XAXX010101000","cuentaBeneficiario":"646180251901000436","referenciaNumerica":220311,"nombreBeneficiario":"XXXXXXXXXX","rfcCurpOrdenante":"XAXX010101000","nombreOrdenante":"XXXXXXXXXX","cuentaOrdenante":"646180251901000436","fechaOperacion":"20220311","claveRastreo":"3843CP03502203111636732938","conceptoPago":"Test Gee","empresa":"WAKKO","monto":10,"clave":216529}';
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
