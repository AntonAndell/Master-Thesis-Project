
const Mam = require('@iota/mam')
const { asciiToTrytes, trytesToAscii } = require('@iota/converter')
var fs = require('fs');
 

const mode = 'public'
const provider = 'https://nodes.devnet.iota.org'


async function createMamState(seed) {
    let mamState = Mam.init(provider, seed);
    root = Mam.getRoot(mamState)
    const result = await Mam.fetch(root, "public")
    mamState.channel.next_root = result.nextRoot
    mamState.channel.start = result.messages.length
    console.log(mamState)

}



// Callback used to pass data out of the fetch
createMamState("SPIGHELMBVPOYR9YNGDRUDXKSJBQOUXIOISITEODXCYAKOTDAWWZS9BMVVKGFZSKJNLJQOCTPKPCGNTUA")
//syncTarget("UXIVVSKXIRAHWATWRJRZNQYT9PVAFSARD9WRTL9TAXKLVLACVNCCWDDAKCZJLZGVBSIGGA9ZPQMPFBOLX","IZXNNDWMOUBKTXXTHGODUPDMRFGGIW9SDTWYINJCKD9U9NROUFECHMTUQJUBTL9HEJUUFEGVOZ9WWN9AF")