const Mam = require('@iota/mam')
const { asciiToTrytes, trytesToAscii } = require('@iota/converter')
var fs = require('fs');
 
/////////////////////////////////////////////
// Send a zero-value transaction with a "hello world" message
/////////////////////////////////////////////

const Iota = require('@iota/core');
const Converter = require('@iota/converter');

// Connect to a node
const iota = Iota.composeAPI({
  provider: 'https://nodes.thetangle.org:443'
});

const depth = 3;
const minimumWeightMagnitude = 14;

// Def& !this.candidateSentine a seed and an address.
// These do not need to belong to anyone or have IOTA tokens.
// They must only contain a mamximum of 81 trytes
// or 90 trytes with a valid checksum
const address =
  'MYAPPWORLSHELLOWORLDHELLOWORLASDLLOWORLDHELLOWORLDHELLOWORLDHELLOWORLDHELLOWOR99D';
const seed =
  'PUEOTSEITFEVEWCWBTSIZM9NKRGJEIMXTULBACGFRQK9IMGICLBKW9TTEVSDQMGWKBXPVCBMMCXWMNPDX';

// Define a message to send.
// This message must include only ASCII characters.

// Convert the message to trytes
const messageInTrytes = Converter.asciiToTrytes("test");
const transfers = [
  {
    "value": 0,
    "address": address,
    "message": messageInTrytes,

   }
];

// Create a bundle from the `transfers` array
// and send the transaction to the node
iota
  .prepareTransfers(seed, transfers)
  .then(trytes => {
    console.time('someFunction')


    return iota.sendTrytes(trytes, depth, minimumWeightMagnitude);
  })
  .then(bundle => {
    console.log(bundle[0].hash);
    console.timeEnd('someFunction')
  })
  .catch(err => {
    console.error(err)
  });
