const Mam = require('@iota/mam')
const { asciiToTrytes, trytesToAscii } = require('@iota/converter')
var fs = require('fs');
 

const mode = 'public'
const provider = 'https://nodes.devnet.iota.org'
let mamState = Mam.init(provider);
var myArgs = process.argv.slice(2);
const filepath = myArgs[0]
const publish = async packet => {
    // Create MAM Payload - STRING OF TRYTES
    
    var mamStateJson = fs.readFileSync(filepath, 'utf8');
    //console.log(mamStateJson)
    var mamState = JSON.parse(mamStateJson);
    //console.log(mamState)
    const trytes = asciiToTrytes(packet)

    const message = Mam.create(mamState, trytes)

    // Save new mamState
    mamState = message.state
 
    // Attach the payload

    console.log("Attached")
    console.log(message.root)
    try {
        await Mam.attach(message.payload, message.address, 3, 9);
      } catch (error) {
        console.error(error);
        return
        // expected output: ReferenceError: nonExistentFunction is not defined
        // Note - error messages will vary depending on browser
      }
      

    //console.log('Published', packet, '\n');
    var jsonContent = JSON.stringify(mamState);
 
    fs.writeFile(filepath, jsonContent, 'utf8', function (err) {
        if (err) {
            console.log("An error occured while writing JSON Object to File.");
            return console.log(err);
        }
    
        //console.log("JSON file has been saved.");
    }); 
}

const publishAll = async () => {

  const root = await publish(myArgs[1])
}

publishAll()
 