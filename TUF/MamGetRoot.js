const Mam = require('@iota/mam');
const provider = 'https://nodes.thetangle.org:443'
// file system module to perform file operations
const fs = require('fs');
 
// json data
var myArgs = process.argv.slice(2);
seed = myArgs[0]
let mamState = Mam.init(provider, seed);
console.log(Mam.getRoot(mamState))