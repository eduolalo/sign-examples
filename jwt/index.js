/**
 * Para este script se uso Node en su version 12
 */

const axios = require('axios');
const jwtLib = require('./jwtLib.js');

const ids = [
    '105FE5BE-F417-4091-B423-ED916A17C4B0',
    '89A4EBD0-B512-4B15-B212-3EB5548E46FB',
    'AACAECB5-4313-4097-BA15-D6A0C20D871F',
    '32A04CBF-C428-421A-8366-EFFEAC432C36',
    '3D8BEC80-79D3-4476-BD6D-59CF2EDC2D67',
    '32D7DCE2-66C9-4FD0-AB53-9F5D70117C91',
    '5CA1763D-5C69-41F1-B163-B53F0EE463A9',
    '952D2C1F-54AD-48D5-B776-D6C5CC9D3B43',
    '8A8C2CF5-23AE-47DE-BD44-1B1F52D3383D',
    '40876B80-5988-45D9-A44E-29293385658E',
    '2CDE4C71-7FDE-42CA-BCD5-4E3099528531',
    '4FF85B50-45B4-4F4F-881B-E7A727504485',
    '26E92AEE-9EA6-4723-AE4A-4E939C07401A',
    'F67AAF4A-5609-45B5-8EC8-247B7DE8545E',
    'A587A397-8257-4E8D-9669-8B2C81BA9749',
    '9E728043-C11F-4156-BB18-1F50D4BD1D9A',
    'B9841480-40ED-41E1-8CFA-29ACBF409661',
    '4FB527A5-232D-48E4-AFE3-31FEBDF64C1D',
    '8DB926A3-57A9-4A80-9BBA-3E2E3D71DF94',
    '44BCC117-F9F4-4FE8-8761-4C0733FC2DE3',
    'E8FBCAA8-BBB3-4C01-8462-4FFEEB170EF1',
    'F877DFF2-D6BE-4AAD-BFFA-5A28C8E6C477',
    '400BAA35-C612-401E-A8C6-7BEA2EC7A9AE',
    'FB802447-9F80-4B45-945D-C0040633D7C9',
    'DB122EE1-5AB4-449A-AF16-C1573BC44742',
    '412B767A-2B84-40CA-97C7-CB62BA09B79B',
    '5AB06B3A-E8AE-4815-BD5C-F4F412251D6D',
    '42B178DE-6D3B-48D5-87FE-1B3EC34F6F1A',
    '1858BE81-7844-4828-AAD7-66E303ACD1F2',
    'DD2C4428-40B1-45A0-8411-C20B5806AC3B',
    '5D421BF4-FA09-40A5-9079-ACFC884D3C73',
    '241BC2A3-4CF8-4DDF-979B-67A282FBA0D3',
    '86547576-6D4B-4734-8F9B-5BA567D82086',
    '11B11C8A-5923-45E6-A70F-14AEC5F02044',
    '1B87AA50-BEA8-4815-87F4-440DD52CE8D5',
    '9463C9D5-3A40-4EB4-BB56-5904B07066FC',
    'ECC4646D-2BF2-48EC-9856-92DDF6C26FBA',
    'AC39D334-65B5-43A7-BD2D-B56EAFB3BEC0',
    '00B35377-2019-4D57-8853-5BB5793B3F32',
    '35A08682-E2C7-489F-945E-CD913713FFA2',
    'E7FBD63D-2A23-4DB6-B902-D6E5417E62D4',
    '9D8C23AB-3CD9-446E-9797-EC5C265A21FC',
    '9934E3CE-AE32-4451-A6B8-F69CB21775D2',
    '608F3F76-908A-4ED3-8460-5CA741FFADFA',
    '8E9BC6DC-4270-4059-9569-8EA9C2BE3628',
    'D371CB1E-6987-40AD-BC6D-0DF7F31B2D9E',
    '6E6B0180-67D6-444B-A8DD-53080CDA5663',
    '815E336A-9B96-46A3-8F53-F436817CD11B',
    '597C914A-4907-485F-ACFB-27FE6DC72EAC',
    '052846EB-602A-492D-81FB-8176975F379F'
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
        })
        .catch((err) => {
            console.error("Error al obtener el depósito: ", err)
        });
})();