const Mam = require('@iota/mam')
const { asciiToTrytes, trytesToAscii } = require('@iota/converter')
var fs = require('fs');
 

const mode = 'public'
const provider = 'https://nodes.devnet.iota.org'
let mamState = Mam.init(provider);
/*var myArgs = process.argv.slice(2);
console.log('myArgs: ', myArgs);
const filepath = myArgs[0]
console.log(filepath)*/
const syncMam = async packet => {
    // Create MAM Payload - STRING OF TRYTES
    
    var mamStateJson = fs.readFileSync('/home/andell/Programming/Master-Thesis-Project/TUF/mam.json', 'utf8');
    var mamState = JSON.parse(mamStateJson);
    const seed = mamState.seed
    const root = Mam.getRoot(mamState)
    const trytes = asciiToTrytes("asd")

    console.log(mamState)
    console.log(root)
    console.log(seed)
    // Save new mamState

 
    // Attach the payload

 
    var jsonContent = JSON.stringify(mamState);
 
}

// Callback used to pass data out of the fetch
syncMam()