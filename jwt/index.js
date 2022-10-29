/**
 * Para este script se uso Node en su version 12
 */

const axios = require('axios');
const jwtLib = require('./jwtLib.js');


    /**
     * Test con la librería jsonwebtoken
     */
    (function () {

        const depositID = 'c7f1c988-92b5-48fa-9d35-2fa4f65ed4d9'; // <- Cambia por tu depositID
        const key = process.env.API_KEY;
        const host = process.env.HOST_TEST;
        const token = jwtLib(depositID)
        axios.get(`${host}/deposit/${depositID}`,{ 
            timeout: 6000,
            headers: {
                'W-Api-Key': key,
                'Authorization': `Bearer ${token}`
            }
        })
            .then((res) => {

                console.log(res.data);
            })
            .catch((err) => {
                console.error("Error al obtener el depósito: ", err.response.data)
            })
            .finally(()=>{
                console.log(token)
            })
    })();