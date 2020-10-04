import web3 from './web3';

// contract address
const address = '0x3874Dd96eFA479325d234e36c66dB8562388EAb9';

// contract abi/interface
const abi = [{ "constant": true, "inputs": [], "name": "manager", "outputs": [{ "name": "", "type": "address" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [], "name": "pickWinner", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "getPlayers", "outputs": [{ "name": "", "type": "address[]" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [], "name": "enter", "outputs": [], "payable": true, "stateMutability": "payable", "type": "function" }, { "constant": true, "inputs": [{ "name": "", "type": "uint256" }], "name": "players", "outputs": [{ "name": "", "type": "address" }], "payable": false, "stateMutability": "view", "type": "function" }, { "inputs": [], "payable": false, "stateMutability": "nonpayable", "type": "constructor" }];

export default new web3.eth.Contract(abi, address);