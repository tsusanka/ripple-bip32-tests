const sign = require("ripple-sign-keypairs");
const keypairs = require("ripple-keypairs");
const bip39 = require("bip39");
const bip32 = require("ripple-bip32");

const mnemonic = 'all all all all all all all all all all all all'
const seed = bip39.mnemonicToSeed(mnemonic)
const m = bip32.fromSeedBuffer(seed)
console.log('mnomonic:')
console.log(mnemonic)

const srcpair = m.derivePath("m/44'/144'/0'/0/0").keyPair.getKeyPairs()
srcpair.address = keypairs.deriveAddress(srcpair.publicKey)
console.log('address:')
console.log(srcpair.address)
console.log('public key:')
console.log(srcpair.publicKey)
console.log('private key:')
console.log(srcpair.privateKey)

const tx = JSON.parse('{"TransactionType":"Payment","Account":"rNaqKtKrMSwpwZSzRckPf7S96DkimjkF4H","Destination":"rBKz5MC2iXdoS3XgnNSYmF69K1Yo4NS3Ws","Amount":"100000000","Flags":2147483648,"Fee":"100000","Sequence":25}')
const txJSON = JSON.stringify(tx)
const txSign = sign(txJSON, srcpair)

console.log('\n')
console.log('signs this transaction:')
console.log(txJSON)

console.log('with this result:')
console.log(txSign)
