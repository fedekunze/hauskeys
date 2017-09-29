import Web3 from "web3";

const web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545")); //("https://rinkeby.infura.io"));



var contract_abi = [{"constant":false,"inputs":[{"name":"_offer_id","type":"uint256"}],"name":"editOffer","outputs":[],"payable":true,"type":"function"},{"constant":true,"inputs":[],"name":"offer_id","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_unit_id","type":"uint256"}],"name":"checkUnitOffers","outputs":[{"name":"","type":"uint256[]"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_unit_id","type":"uint256"},{"name":"_offer_id","type":"uint256"}],"name":"acceptOffer","outputs":[],"payable":true,"type":"function"},{"constant":false,"inputs":[{"name":"_offer_id","type":"uint256"}],"name":"rejectOffer","outputs":[],"payable":true,"type":"function"},{"constant":false,"inputs":[{"name":"_offer_id","type":"uint256"}],"name":"showOfferInfo","outputs":[{"name":"","type":"address"},{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_unit_id","type":"uint256"}],"name":"makeOffer","outputs":[],"payable":true,"type":"function"},{"constant":false,"inputs":[],"name":"ScrowContract","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"unit_id","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_offer_id","type":"uint256"}],"name":"cancelOffer","outputs":[],"payable":true,"type":"function"},{"constant":false,"inputs":[{"name":"_rooms","type":"uint256"},{"name":"street_addr","type":"string"},{"name":"_apt_room","type":"string"},{"name":"zip","type":"uint256"},{"name":"state","type":"string"},{"name":"_country","type":"string"},{"name":"_rent","type":"uint256"}],"name":"postUnit","outputs":[],"payable":false,"type":"function"},{"payable":false,"type":"fallback"},{"anonymous":false,"inputs":[{"indexed":false,"name":"landlord","type":"address"},{"indexed":false,"name":"unit","type":"uint256"}],"name":"UnitPosted","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"ptenant","type":"address"},{"indexed":false,"name":"offer","type":"uint256"},{"indexed":false,"name":"landlord","type":"address"}],"name":"OfferMade","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"ptenant","type":"address"},{"indexed":false,"name":"offer","type":"uint256"},{"indexed":false,"name":"landlord","type":"address"}],"name":"OfferRejected","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"landlord","type":"address"}],"name":"PaymentAccepted","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"ptenant","type":"address"}],"name":"ChangeTranfered","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"ptenant","type":"address"},{"indexed":false,"name":"offer","type":"uint256"},{"indexed":false,"name":"landlord","type":"address"}],"name":"OfferCanceled","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"ptenant","type":"address"},{"indexed":false,"name":"offer","type":"uint256"},{"indexed":false,"name":"landlord","type":"address"}],"name":"OfferUpdated","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"landlord","type":"address"}],"name":"UnitReceived","type":"event"}];


var address = '0xe75ce7038c165f33904ab8490216d43ad611a1ef';

// creation and instantiation of contract
const escrowContract = web3.eth.contract(contract_abi).at(address);


/*

var myEvent = myContractInstance.MyEvent({some: 'args'}, {fromBlock: 0, toBlock: 'latest'});
myEvent.watch(function(error, result){
  if (!error) console.log(result);
});

var addr = web3.eth.accounts[0];

var defaultBlock = web3.eth.defaultBlock; // latest block
var hashrate = web3.eth.hashrate;
var blockNumber = web3.eth.blockNumber; // most recent block number
var transactions = web3.eth.getBlockTransactionCount(defaultBlock);
var gasPrice = web3.eth.gasPrice;
var defaultAccount = web3.eth.defaultAccount;

var balance = web3.eth.getBalance(addr);
var balanceInWei = balance.toString(10);
balance = web3.fromWei(balanceInWei, 'ether');
*/

export {escrowContract, web3, address};
