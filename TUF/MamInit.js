const Mam = require('@iota/mam');
const provider = 'https://nodes.devnet.iota.org';
// file system module to perform file operations
const fs = require('fs');
 
// json data
// json data
var myArgs = process.argv.slice(2);
seed = myArgs[0]
name = myArgs[1]
//console.log(seed, name)
let mamState = Mam.init(provider, seed);
//var jsonObj = JSON.parse(mamState);
var jsonContent = JSON.stringify(mamState);
 
fs.writeFile(name,  jsonContent, 'utf8', function (err) {
    if (err) {
        console.log("An error occured while writing JSON Object to File.");
        return console.log(err);
    }
 
    //console.log("JSON file has been saved.");
}); 
