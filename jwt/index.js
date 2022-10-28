/**
 * Para este script se uso Node en su version 12
 */

const axios = require('axios');
const jwtLib = require('./jwtLib.js');


    /**
     * Test con la librería jsonwebtoken
     */
    (function () {

        const key = process.env.API_KEY;
        const host = process.env.HOST_TEST;
        axios.get(`${host}/deposit/c7f1c988-92b5-48fa-9d35-2fa4f65ed4d9`,{
            timeout: 6000,
            headers: {
                'W-Api-Key': key,
                'Authorization': `Bearer ${jwtLib()}`
            }
        })
            .then((res) => {

                console.log(res);
            })
            .catch((err) => console.error("Error al obtener el depósito: ", err))
    })();