/**
 * Para este script se uso Node en su version 12
 */

const axios = require('axios');
const jwtLib = require('./jwtLib.js');

const ids = [
    '105FE5BE-F417-4091-B423-ED916A17C4B0'
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
            .then(() => {

                console.log('ok');
            })
            .catch((err) => {
                console.log(token);
                console.error("Error al obtener el depósito: ", err)
            });
        promArr.push(req);
    }
    Promise.all(promArr)
        .then((res) => {

            console.log('main --> ok');
            console.log('info: ', res);
        })
        .catch((err) => {
            console.error("Error al obtener el depósito: ", err)
        });
})();