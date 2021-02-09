# Import API class
from iota.multisig import MultisigIota

# Declare a multisig API instance
api = MultisigIota(
        adapter = 'http://localhost:14265',

        seed =
            (
                b'TESTVALUE9DONTUSEINPRODUCTION99999JYFRTI'
                b'WMKVVBAIEIYZDWLUVOYTZBKPKLLUMPDF9PPFLO9KT',
            ),
)

response = api.get_digests(0,3)
print(response)