import HDWalletProvider from '@truffle/hdwallet-provider';
import Web3 from 'web3';

import { abi, evm } from './compile.js';

const provider = new HDWalletProvider('REPLACE_WITH_YOUR_MNEMONIC', 'REPLACE_WITH_YOUR_INFURA_URL');

const web3 = new Web3(provider);

const deploy = async () => {
	const accounts = await web3.eth.getAccounts();

	console.log('Attempting to deploy from account', accounts[0]);

	const result = await new web3.eth.Contract(abi).deploy({ data: evm.bytecode.object, arguments: ['Hi there!'] }).send({ gas: '1000000', from: accounts[0] });

	console.log('Contract deployed to', result.options.address);
	provider.engine.stop();
};
deploy();
