const path = require('path');
const fs = require('fs');
const solc = require('solc');

// to get the path of the contract sol file.
const inboxPath = path.resolve(__dirname, 'contracts', 'Inbox.sol');
// to read the contract file
const source = fs.readFileSync(inboxPath, 'utf-8');

// compile solidity file and number of contract files
module.exports =  solc.compile(source, 1).contracts[':Inbox'];