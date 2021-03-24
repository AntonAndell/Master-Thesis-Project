///////////////////////////////
// Listen to live transactions
///////////////////////////////

const Iota = require('@iota/core');

// Connect to a node
const iota = Iota.composeAPI({
  provider: 'https://nodes.thetangle.org:443'
});

// Define the tail transaction hash of the bundle whose messages you want to read
const tailTransactionHash =
    'HNFYBIFCBAVDXRIVEXCSUZUSTVXLTYKMFJPVADRPBTOZCUDQBQGCWNYZGNXMPLCRBAKDIKWBLEWM99999';

// Get the transaction objects in the bundle
console.time('someFunction')
iota.getBundle(tailTransactionHash)
  .then(bundle => {
    console.timeEnd('someFunction')
    // Extract and parse the JSON messages from the transactions' `signatureMessageFragment` fields
  })
  .catch(err => {
    console.error(err);
  });
