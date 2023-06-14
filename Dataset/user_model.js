const {readFileSync} = require('fs');

let loadJabar = () => JSON.parse(readFileSync('./DatasetEmergency/jabar.json'));
let loadJateng = () => JSON.parse(readFileSync('./DatasetEmergency/jateng.json'));
let loadSumsel = () => JSON.parse(readFileSync('./DatasetEmergency/sumsel.json'));
let firstaid = () => JSON.parse(readFileSync('./DatasetFirstAid/firstaid.json'));

module.exports = {loadJabar, loadJateng, loadSumsel, firstaid};