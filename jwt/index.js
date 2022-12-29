/**
 * Para este script se uso Node en su version 12
 */

const axios = require('axios');
const jwtLib = require('./jwtLib.js');

const ids = [
    '4f54775e-577e-485b-b801-6cc8bfc305cc'
];

/**
 * Test con la librería jsonwebtoken
 */
(function () {


    const key = process.env.API_KEY;
    const host = process.env.HOST_TEST;
    const promArr = [];
    for (let i = 0; i < ids.length; i++) {
        const depositID = ids[i];
        const token = jwtLib(depositID)
        let req = axios.get(`${host}/deposit/${depositID}`, {
            timeout: 6000,
            headers: {
                'W-Api-Key': key,
                'Authorization': `Bearer ${token}`
            }
        })
            .then((res) => {

                console.log(res);
            })
            .catch((err) => {
                console.log(token);
                let mssj = err.response.data|| "Error al obtener el depósito";
                console.error(mssj)
            });
        promArr.push(req);
    }
    Promise.all(promArr)
        .then((res) => {

            console.log('main --> ok');
        })
        .catch((err) => {
            console.error("Error al obtener el depósito: ", err)
        });
})();
