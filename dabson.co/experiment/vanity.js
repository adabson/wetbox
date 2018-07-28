var bitcoin = require('bitcoinjs-lib');

/* How to make a WIF
    1. Take a private key 0C28FCA386C7A227600B2FE50B7CAE11EC86D3BF1FBE471BE89827E19D72AA1D = 256 bits
    2. Add a 0x80 (mainnet) or 0xef (testnet) addresses. Also add a 0x01 at the end if the private key will correspond to a compressed public key
    3. Perform SHA256 on the extended key
    4. Performe SHA256 on the result of the SHA256 hash
    5. Take the first 4 bytes of the second SHA256 hash, this is the checksum
    6. Add the 4 checksum bytes from point 5 at the end of the extended key from point 2
    7. Convert the result from a byte string into a base58 string using Base58Check encoding, this is the wallet import format
    private key is 256bytes (64 nibbles)
    //WIF should start with 5(uncompressed), or 'K'/'L' (compressed address format)
*/

// private,public:
// L5AvBWoPP5khkr41CyTL3VUa1c5gLZeLvx5gZLTuCQocBKa2thxi
// 19rJ5PSjfEn6XXfP3Jqj8Ggend5bbygcYu
//
// when importing a private key, if the public key/address for a particular private key are to be derived from the 
// compressed encoding of the public key, the private key gets an extra 0x01 byte at the end, resulting in a base58 form that starts with 'K' or 'L'
// when importing, it will used the uncompressed encoding if the '5' format was used, and the compressed encoding if the 'K'/'L' format is used
// doesnt make sense to convert one to the other, the client must use the same encoding as was used when generating the address, 
// or the address wont match 

var keyPair = bitcoin.ECPair.makeRandom();
console.log(keyPair.toWIF());              // WIF is a way of encoding a private ECDSA (Elliptic Curve Digital Signature Algorithm) key
console.log(keyPair.getAddress());

var i;
var x = '';
var start = new Date().getTime();
var keyPair

for( i=0;!x.startsWith('11');i++ ) {
    keyPair = bitcoin.ECPair.makeRandom();
    x = keyPair.getAddress();
    console.log(x);
}
var end = new Date().getTime();
var deltaTime =end-start;

console.log('------------------');
console.log(keyPair.getAddress())
console.log(keyPair.toWIF()); //vanity address of hi

console.log( 'randomising',i,'vanity addresses took',deltaTime/1000,'seconds')

//keyPair.