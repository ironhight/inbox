import { ok, equal } from 'assert';
import Web3 from 'web3';
import ganache from 'ganache';
const web3 = new Web3(ganache.provider());

import { abi, evm } from '../compile.js';

let accounts;
let inbox;

beforeEach(async () => {
	accounts = await web3.eth.getAccounts();
	inbox = await new web3.eth.Contract(abi)
		.deploy({
			data: evm.bytecode.object,
			arguments: ['Hi there!'],
		})
		.send({ from: accounts[0], gas: '1000000' });
});

describe('Inbox', () => {
	it('deploys a contract', () => {
		ok(inbox.options.address);
	});

	it('has a default message', async () => {
		const message = await inbox.methods.message().call();
		equal(message, 'Hi there!');
	});

	it('can change the message', async () => {
		await inbox.methods.setMessage('bye').send({ from: accounts[0] });
		const message = await inbox.methods.message().call();
		equal(message, 'bye');
	});
});
