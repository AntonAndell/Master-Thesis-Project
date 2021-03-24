const Mam = require('@iota/mam')
const { asciiToTrytes, trytesToAscii,trytesToTrits, tritsToBytes, bytesToTrits , byte} = require('@iota/converter')
var fs = require('fs');
 

const mode = 'public'
const provider = 'https://nodes.thetangle.org:443'
let mamState = Mam.init(provider);
var myArgs = process.argv.slice(2);

var data = fs.readFileSync(myArgs[0], 'utf8');
const trytes = asciiToTrytes(data)
const trits = trytesToTrits(trytes)

console.log(trytes.length)
