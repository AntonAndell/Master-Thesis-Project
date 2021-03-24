
const Mam = require('@iota/mam')
const { asciiToTrytes, trytesToAscii } = require('@iota/converter')
var fs = require('fs');
const { start } = require('repl');
 

const mode = 'public'
const provider = 'https://nodes.thetangle.org:443'
let mamState = Mam.init(provider);
var myArgs = process.argv.slice(2);


async function fetch(root) {
    console.time('someFunction')
    Mam.fetchSingle(root, "public").then(() => console.timeEnd('someFunction') )
}        
   

// Callback used to pass data out of the fetch
fetch("BGGYBJY9DYXXVZWLDAQIZHI9UUZLVKUPGIBKSCMATPP9OSAVFOXGQN9TBFOHUAQRPABRQTEWGFXK9CQYJ")
//syncTarget("UXIVVSKXIRAHWATWRJRZNQYT9PVAFSARD9WRTL9TAXKLVLACVNCCWDDAKCZJLZGVBSIGGA9ZPQMPFBOLX","IZXNNDWMOUBKTXXTHGODUPDMRFGGIW9SDTWYINJCKD9U9NROUFECHMTUQJUBTL9HEJUUFEGVOZ9WWN9AF")