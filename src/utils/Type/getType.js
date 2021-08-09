const fetch = require('node-fetch');
const  TYPE_URL = 'https://pokeapi.co/api/v2/type';

//=======================$type helper functions====================//
function getDamageArray(damageAdOrDis) {
    if (damageAdOrDis.length == 0) return ['N/A types'];
    let damageArray = [];
    for (let i = 0; i < damageAdOrDis.length; i++) {
        damageArray.push(damageAdOrDis[i].name);
    }
    return damageArray;
}

async function getTypeJSON(message) {
    const type = message.content.toLowerCase().split(" ")[1];
    let response = await fetch(`${TYPE_URL}/${type}`);
    const typeData = response.json();
    return typeData;
}

//=======================EXPORTS====================//
module.exports = { getTypeJSON, getDamageArray };