const assert = require('assert');
const ganache = require('ganache-cli');
// Web3 is used as constructor, so make 'W' capital for const.
const Web3 = require('web3');
const { interface, bytecode } = require("../compile")


// provider is used for communication between web3 and ganache test network.
// instance of web3.
const web3 = new Web3(ganache.provider());

// beforeEach(() => {
    // get list of all accounts
    // getAccounts() are async and returns promise.

    // web3.eth.getAccounts().then(fetchedAccounts => {
    //     console.log("fetchedAccounts", fetchedAccounts)
    // });      
// });

// OR

let accounts;
// Using async await.
beforeEach(async () => {
    // get ethereum accounts
    accounts = await web3.eth.getAccounts();

    // Use any one account to deploy the contract.
    inbox = await new web3.eth.Contract(JSON.parse(interface)).deploy({ data: bytecode, arguments: ['Hi karthik'] })
    .send({ from: accounts[0], gas: '1000000' }) 
});

describe("Inbox", () => {
    it("deploy a contract", () => {
        // check if exists or not
        assert.ok(inbox.options.address);
    });

    it('has a default message', async () => {
        const message = await inbox.methods.message().call();
        assert.equal(message, 'Hi karthik')
    });

    it('can change the message', async () => {
        await inbox.methods.setMessage('welcome').send({ from: accounts[0] });
        const message = await inbox.methods.message().call();
        assert.equal(message, 'welcome');
    });
});

// testing using mocha - "npm run test" 
// *in package.json change the script:{test:"mocha"}.

// class Car {
//     park() {
//         return 'stopped';
//     }
//     drive() {
//         return 'broom..'
//     }
// }

// define let variable.
// let car;
// beforeEach is a mocha function, which will be executed everytime before it() func. so that common(repeated) operations needed are exceuted.
// beforeEach(() => {
//     console.log("before each")
//     car = new Car();
// });

// describe func is another mocha function, which will group the multiple it() function.
// describe('car', () =>{
//     // it func is also a mocha function, which executes the test.
//     it('can park', () => {
//         // const car = new Car();
//         // assert will compare the output and values.
//         assert.equal(car.park(), 'stopped');
//     });

//     it('can drive', () => {
//         // const car = new Car();
//         assert.equal(car.drive(), 'broom..')
//     });
// });
