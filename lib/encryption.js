const md5 = require('md5')
const { v4: uuidv4 } = require('uuid');

let MD5 = async function(val,salt){
    var passSalt = md5(md5(val)+salt);
    return passSalt
}

let getUuid = function(){
    var uuid = uuidv4();
    return uuid
}

module.exports = {MD5,getUuid}